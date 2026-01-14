using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
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
    public class ClassController : ControllerBase
    {
        private IClassRepository classRepository;
        private IInstitutionRepository institutionRepository;
        private readonly UserManager<Photographer> userManager;

        [ActivatorUtilitiesConstructor]
        public ClassController(IClassRepository repo, IInstitutionRepository institutionRepository, UserManager<Photographer> userManager)
        {
            this.classRepository = repo;
            this.institutionRepository = institutionRepository;
            this.userManager = userManager;
        }

        // GET: api/Institution
        [HttpGet("{institutionId}")]
        public ActionResult<IEnumerable<Class>> GetClassesByInstitution(int institutionId)
        {
            return Content(JsonSerializer.Serialize(classRepository
                .GetAll()
                .Where(c => c.InstitutionId == institutionId)
                .OrderBy(c => c.Name)
                .ToList()), "application/json");
        }


        // PUT: api/Class/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public ActionResult<Class> PutClass(int id, Class @class)
        {
            if (id != @class.Id)
            {
                return BadRequest();
            }

            this.classRepository.Update(@class);
            return Content(JsonSerializer.Serialize(@class), "application/json");
        }

        // POST: api/Class
        [HttpPost]
        [Authorize]
        public ActionResult<Class> PostClass(Class newClass)
        {
            Photographer? user = userManager.Users.FirstOrDefault(u => u.Id == userManager.GetUserId(User));

            if (user == null)
                return Unauthorized();

            // Checking if the user can add classes to the institution

            Institution institution = this.institutionRepository.GetById(newClass.InstitutionId);
            if(institution == null)
                return BadRequest();

            if(institution.PhotographerId != user.Id)
                return Unauthorized();
            // TODO this fails
            //if (!user.Institutions.Any(i => i.Id == newClass.InstitutionId))
                //return Unauthorized();

            if (this.classRepository.GetAll().Any(i => i.Name == newClass.Name && i.Institution.Id == newClass.InstitutionId))
                return BadRequest("Az osztály már létezik.");

            this.classRepository.Insert(newClass);
            return Content(JsonSerializer.Serialize(newClass), "application/json");
        }

        // DELETE: api/Class/5
        [HttpDelete("{id}")]
        public IActionResult DeleteClass(int id)
        {
            var @class = this.classRepository.GetById(id);
            if (@class == null)
            {
                return NotFound();
            }

            this.classRepository.Delete(@class.Id);

            return NoContent();
        }
    }
}
