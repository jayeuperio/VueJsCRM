using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using VueJsCRMWeb.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace VueJsCRMWeb.Controllers
{
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
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
        #endregion

        #region Private Methods
        private string GenerateToken(UserViewModel userModel)
        {
            var claims = new Claim[]
            {
                new Claim(ClaimTypes.Name, userModel.UserName)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(10),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes("ApplicationSettingsSecret")),
                                             SecurityAlgorithms.HmacSha256)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return tokenString;
        }
        #endregion
    }
}
