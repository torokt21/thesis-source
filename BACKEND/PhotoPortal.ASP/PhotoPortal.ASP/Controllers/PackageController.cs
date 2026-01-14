using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PhotoPortal.ASP.Data;
using PhotoPortal.ASP.Data.Dtos;
using PhotoPortal.ASP.Models;
using System.Text.Json;

namespace PhotoPortal.ASP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PackageController : Controller
    {
        private IProductRepository productRepository;
        private IPackageRepository packageRepository;
        private readonly UserManager<Photographer> userManager;

        [ActivatorUtilitiesConstructor]
        public PackageController(IProductRepository repo, IPackageRepository packageRepository, UserManager<Photographer> userManager)
        {
            this.productRepository = repo;
            this.packageRepository = packageRepository;
            this.userManager = userManager;
        }

        [HttpGet]
        [Authorize]
        public ActionResult<IEnumerable<Product>> GetPackages()
        {
            Photographer? user = userManager.Users.FirstOrDefault(u => u.Id == userManager.GetUserId(User));
            return Content(JsonSerializer.Serialize(user.PackageInformations), "application/json");
        }

        [HttpGet("{id}")]
        public ActionResult<Product> GetPackage(int id)
        {
            var package = packageRepository.GetById(id);

            if (package == null)
            {
                return NotFound();
            }
            return Content(JsonSerializer.Serialize(package), "application/json");
        }

        [HttpPut("{id}")]
        public ActionResult<Product> PutPackage(int id, PackageInformation package)
        {
            if (id != package.Id)
            {
                return BadRequest();
            }

            this.packageRepository.Update(package);

            return Content(JsonSerializer.Serialize(package), "application/json");
        }

        [HttpPut("{id}/Requirements")]
        [Authorize]
        public ActionResult<Product> PutPackageRequirements(int id, PackageRequirementDto requirementDto)
        {
            var package = packageRepository.GetById(id);

            Photographer? user = userManager.Users.FirstOrDefault(u => u.Id == userManager.GetUserId(User));

            if (user == null)
                return Unauthorized();

            var products = requirementDto.Requirements
                .ToList()
                .Select(r => new PackageRequirement() { 
                    ProductId = r.ProductId,
                    Quantity = r.Quantity,
                })
                .Where(p => p.Quantity > 0)
                .ToList();
 
            // TODO this is not working
            // TODO validate
            if (products.Any(p => p == null))
                return BadRequest("Hibás szolgáltatás");

            this.packageRepository.SetRequirements(package, products);

            return Content(JsonSerializer.Serialize(package), "application/json");
        }

        [HttpPost]
        [Authorize]
        public ActionResult<Product> PostPackage(PackageInformation package)
        {
            Photographer? user = userManager.Users.FirstOrDefault(u => u.Id == userManager.GetUserId(User));

            if (user == null)
                return Unauthorized();

            if (this.packageRepository.GetAll().Any(i => i.Name == package.Name && i.PhotographerId == user.Id))
                return BadRequest("A megadott csomag már létezik.");

            package.PhotographerId = user.Id;
            this.packageRepository.Insert(package);

            return CreatedAtAction("GetPackage", new { id = package.Id }, package);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public IActionResult DeletePackage(int id)
        {
            var package = this.packageRepository.GetById(id);
            if (package == null)
            {
                return NotFound();
            }

            if (package.PhotographerId != userManager.GetUserId(User))
                return Unauthorized();

            this.packageRepository.Delete(package.Id);

            return NoContent();
        }
    }
}
