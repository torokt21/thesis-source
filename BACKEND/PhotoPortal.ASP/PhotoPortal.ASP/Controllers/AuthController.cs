using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using PhotoPortal.ASP.Data.Dtos.Auth;
using PhotoPortal.ASP.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Numerics;
using System.Security.Claims;
using System.Text;

namespace PhotoPortal.ASP.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly UserManager<Photographer> _userManager;
        private readonly SignInManager<Photographer> _signManager;

        public AuthController(UserManager<Photographer> userManager, SignInManager<Photographer> signManager)
        {
            _userManager = userManager;
            _signManager = signManager;
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginDto model)
        {
            var user = await _userManager.FindByNameAsync(model.Username);
            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                var claim = new List<Claim>
                {
                    new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                    new Claim(JwtRegisteredClaimNames.NameId, user.UserName),
                    new Claim("displayname", user.DisplayName),
                };
                foreach (var role in await _userManager.GetRolesAsync(user))
                {
                    claim.Add(new Claim("role", role));
                }
                var signinKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("PhotoPortalSecurityKey"));
                var token = new JwtSecurityToken(
                 issuer: "http://www.security.org", audience: "http://www.security.org",
                 claims: claim, expires: DateTime.Now.AddDays(30),
                 signingCredentials: new SigningCredentials(signinKey, SecurityAlgorithms.HmacSha256)
                );
                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiration = token.ValidTo,
                    id = user.Id
                });
            }
            return Unauthorized();
        }

        [HttpPost]
        [Route("logout")]
        public async Task<IActionResult> Logout()
        {
            await _signManager.SignOutAsync();
            return Ok();
        }
    }
}
