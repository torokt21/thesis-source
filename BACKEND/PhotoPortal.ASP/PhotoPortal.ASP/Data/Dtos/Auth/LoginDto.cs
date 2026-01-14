using Microsoft.AspNetCore.Mvc;

namespace PhotoPortal.ASP.Data.Dtos.Auth
{
    public class LoginDto
    {
        public string Username { get; set; }

        public string Password { get; set; }
    }
}
