using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VueJsCRMWeb.Models
{
    public class AuthResultModel
    {
        public string UserName { get; set; }
        public string[] Roles { get; set; }
        public string Token { get; set; }
        public bool Success { get; set; }
    }
}
