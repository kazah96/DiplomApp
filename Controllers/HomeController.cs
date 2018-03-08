using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc.Controllers;
using System.Collections.Generic;
using System.Linq;
using DiplomApp.Models;
using System.Runtime.InteropServices;
using System.Diagnostics;

namespace DiplomApp.Models
{
    public class InfoModel
    {
        public string SystemTime;
        public string OSInfo;
        public string Uptime;
    }
}


namespace DiplomApp.Controllers
{
       [EnableCors("AllowAllOrigin")]
    [Route("api/[Controller]")]
    public class InfoController : Controller
    {
        public IActionResult Get()
        {
            ProcessStartInfo t = new ProcessStartInfo("uptime");
            t.RedirectStandardOutput = true;
            Process f = Process.Start(t);
            var w = f.StandardOutput;


            return new ObjectResult(new InfoModel{SystemTime = System.DateTime.Now.ToString(),
            OSInfo = RuntimeInformation.OSDescription,
            Uptime = w.ReadToEnd()});

        }
    }


    [Route("api/[Controller]")]
    [EnableCors("AllowAllOrigin")]
    public class HomeController : Controller
    {

        List<string> repository = new List<string>
        {
            "huita","huita2","huita3"
        };

        [HttpGet]
        public IActionResult Get()
        {
            return new ObjectResult(repository);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return new ObjectResult("Get action + id: " + repository[id]);
        }

        [HttpPost]
        public IActionResult Post([FromBody] List<string> qq)
        {
            repository.AddRange(qq);
            return new ObjectResult(repository);
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            repository.RemoveAt(id);
            return new ObjectResult(repository);

        }




    }
}