using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PhotoPortal.ASP.Data;
using PhotoPortal.ASP.Models;

namespace PhotoPortal.ASP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InstitutionController : ControllerBase
    {
        private IInstitutionRepository institutionRepository;
        private readonly UserManager<Photographer> userManager;

        public InstitutionController(IInstitutionRepository repo, UserManager<Photographer> userManager)
        {
            this.institutionRepository = repo;
            this.userManager = userManager; 
        }

        // GET: api/Institution
        [HttpGet]
        [Authorize(Roles = "Admin,Photographer")]
        public ActionResult<IEnumerable<Institution>> GetInstitutions()
        {
            Photographer? user = userManager.Users.FirstOrDefault(u => u.Id == userManager.GetUserId(User));
            return Content(JsonSerializer.Serialize(user.Institutions), "application/json");
        }

        // GET: api/Institution/5
        [HttpGet("{id}")]
        public ActionResult<Institution> GetInstitution(int id)
        {
            var institution = institutionRepository.GetById(id);

            if (institution == null)
            {
                return NotFound();
            }

            return Content(JsonSerializer.Serialize(institution), "application/json");
        }

        // PUT: api/Institution/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public ActionResult<Institution> PutInstitution(int id, Institution institution)
        {
            if (id != institution.Id)
            {
                return BadRequest();
            }

            this.institutionRepository.Update(institution);

            return institution;
        }

        // POST: api/Institution
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize]
        public ActionResult<Institution> PostInstitution(Institution institution)
        {
            Photographer? user = userManager.Users.FirstOrDefault(u => u.Id == userManager.GetUserId(User));

            if (user == null)
                return Unauthorized();

            if (this.institutionRepository.GetAll().Any(i => i.Shortcode == institution.Shortcode && i.PhotographerId == user.Id))
                return BadRequest("A megadott aztonosító kódot már egy intézmény használja.");

            institution.PhotographerId = user.Id;
            this.institutionRepository.Insert(institution);

            return CreatedAtAction("GetInstitution", new { id = institution.Id }, institution);
        }

        // DELETE: api/Institution/5
        [HttpDelete("{id}")]
        public IActionResult DeleteInstitution(int id)
        {
            var institution = this.institutionRepository.GetById(id);
            if (institution == null)
            {
                return NotFound();
            }

            this.institutionRepository.Delete(institution.Id);

            return NoContent();
        }
    }
}
