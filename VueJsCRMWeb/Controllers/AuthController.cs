using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using VueJsCRMWeb.Helpers;
using VueJsCRMWeb.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace VueJsCRMWeb.Controllers
{
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly AppSettings _appSettings;

        public AuthController(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }

        #region API
        [HttpPost]
        public IActionResult Authenticate([FromBody] CredentialsModel credentials)
        {
            if (credentials == null)
            {
                return BadRequest();
            }

            var userModel = new UserViewModel
            {
                UserName = credentials.UserName
            };
            var token = GenerateToken(userModel);

            var authResult = new AuthResultModel();

            authResult.UserName = credentials.UserName;
            authResult.Token = token;
            authResult.Success = true;
            authResult.Roles = new string[] { "Admin" };

            return new ObjectResult(authResult);
        }

        [Authorize]
        [HttpGet("[action]")]
        public IActionResult GetAuthorize()
        {
            return Ok("Authorize!");
        }
        #endregion

        #region Private Methods
        /// <summary>
        /// STUB Methods
        /// </summary>
        /// <param name="userModel"></param>
        /// <returns></returns>
        private string GenerateToken(UserViewModel userModel)
        {
            var claims = new Claim[]
            {
                new Claim(ClaimTypes.Name, userModel.UserName),
                new Claim(ClaimTypes.Email, "jayeuperio@yahoo.com"),
                new Claim("firstname", "Jay"),
                new Claim("lastname", "Euperio"),
                new Claim("position", "CEO & Founder")
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(10),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.Secret)),
                                             SecurityAlgorithms.HmacSha256)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return tokenString;
        }
        #endregion
    }
}
