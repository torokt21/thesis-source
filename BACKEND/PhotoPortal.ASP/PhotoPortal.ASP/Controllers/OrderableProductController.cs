using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
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
    public class OrderableProductController : ControllerBase
    {
        private IProductRepository productRepository;
        private IInstitutionRepository institutionRepository;
        private readonly UserManager<Photographer> userManager;

        [ActivatorUtilitiesConstructor]
        public OrderableProductController(IProductRepository repo, IInstitutionRepository institutionRepository, UserManager<Photographer> userManager)
        {
            this.productRepository = repo;
            this.institutionRepository = institutionRepository;
            this.userManager = userManager;
        }

        [HttpPost("{institutionId}")]
        [Authorize]
        public ActionResult<Product> PostOrderableProducts(int institutionId, OrderableProductsDto productsDto)
        {
            Photographer? user = userManager.Users.FirstOrDefault(u => u.Id == userManager.GetUserId(User));
            Institution? institution = this.institutionRepository.GetById(institutionId);

            if (user == null)
                return Unauthorized();


            if (institution == null || institution.PhotographerId != user.Id)
                return BadRequest("Nincs ilyen intézmény");

            if (this.productRepository.GetAll().Any(i => i.PhotographerId != i.PhotographerId))
                return BadRequest("A szolgáltatás nem ehhez a fotóshoz tartozik.");

            // Delete all orderable products
            this.productRepository.DeleteAllFromInstitution(institution);

            // Resinsert products that can be ordered
            productsDto.Products.ToList().ForEach(p =>
            {
                Product product = this.productRepository.GetById(p);
                this.productRepository.AddToInstitution(product, institution);
            });

            return new EmptyResult();
        }
    }
}
