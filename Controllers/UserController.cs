using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using tradingAppCS.Context;
using tradingAppCS.Models;

namespace tradingAppCS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class UserController : ControllerBase
    {
        private readonly tradingAppDBContext _authContext;
        private readonly IConfiguration _configuration;
        public UserController(IConfiguration configuration, tradingAppDBContext context)
        {
            _authContext = context;
            _configuration = configuration;
        }

        [HttpPost("CreateToken")]
        public string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>()
            {
                new Claim("UserName", user.Username),
                new Claim("UserId", user.Id.ToString()),
                new Claim("Email", user.Email)
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
                _configuration.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            
            
            return jwt;
        }
        
        [HttpGet("GetAllUsers")]
        public async Task<ActionResult<List<User>>>getUsers()
        {
            var listOfUsers = _authContext.Users.ToList();
            return Ok(listOfUsers);
        }
        
        [HttpPost("AddMoney")]
        public async Task<ActionResult> AddMoney(decimal dollas, int Id)
        {
            var user = await _authContext.Users.FirstOrDefaultAsync(x=> x.Id == Id);
            if (user == null)
                return NotFound(new { Message = "User not found" });

            user.Balance += dollas;
            
            await _authContext.SaveChangesAsync();
            return Ok(new
            {
                Message = dollas + " Dollas Added!"
            });
        }
        
        [HttpPost("ChangePassword")]
        public async Task<ActionResult> ChangePassword(int Id, string oldPassword, string newPassword)
        {
            var user = await _authContext.Users.FirstOrDefaultAsync(x => x.Id == Id);
            if (user == null)
                return NotFound(new { Message = "User not found" });

            // Create a new instance of the PasswordHasher class
            var passwordHasher = new PasswordHasher<User>();
            if (oldPassword == user.Password)
            {
                // Hash the new password
                user.Password = passwordHasher.HashPassword(user, newPassword);
            }
                
            
            await _authContext.SaveChangesAsync();
            return Ok(new
            {
                Message = "Password Changed!"
            });
        }
        
        [HttpPost("ChangeEmail")]
        public async Task<ActionResult> ChangeEmail(int id, string newEmail)
        {
            var user = await _authContext.Users.FirstOrDefaultAsync(x => x.Id == id);
            if (user == null)
                return NotFound(new { Message = "User not found" });

            user.Email = newEmail;

            await _authContext.SaveChangesAsync();
            return Ok(new
            {
                Message = "Email Changed!"
            });
        }
        
        [HttpPost("ChangeUsername")]
        public async Task<ActionResult> Username(int id, string newUsername)
        {
            var user = await _authContext.Users.FirstOrDefaultAsync(x => x.Id == id);
            if (user == null)
                return NotFound(new { Message = "User not found" });

            user.Username = newUsername;

            await _authContext.SaveChangesAsync();
            return Ok(new
            {
                Message = "Username Changed!"
            });
        }
        
        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] User userObj)
        {
            if (userObj == null)
                return BadRequest();

            var user = await _authContext.Users.FirstOrDefaultAsync(x => x.Email == userObj.Email);
            var id = userObj.Id;

            if (user == null)
                return NotFound(new { Message = "User not found!" });

            // Create a new instance of the PasswordHasher class
            var passwordHasher = new PasswordHasher<User>();

            // Verify the entered password
            var result = passwordHasher.VerifyHashedPassword(user, user.Password, userObj.Password);

            if (result == PasswordVerificationResult.Failed)
                return BadRequest(new { Message = "Invalid password!" });

            string token = CreateToken(user);
            
            return Ok(new
            {
                token
            });
        }
        
        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] User userObj)
        {
            if (userObj == null)
                return BadRequest();

            // Create a new instance of the PasswordHasher class
            var passwordHasher = new PasswordHasher<User>();

            // Hash the password
            userObj.Password = passwordHasher.HashPassword(userObj, userObj.Password);

            await _authContext.AddAsync(userObj);
            await _authContext.SaveChangesAsync();
            return Ok(new
            {
                Message = "User Registered!"
            });
        }
        
        [HttpPost("KYC")]
        public async Task<IActionResult> postKYC([FromBody] kycTable kycObj, int userId)
        {
            if (kycObj == null)
                return BadRequest();
            var user = await _authContext.Users.FirstOrDefaultAsync(x => x.Id == userId);

            kycObj.UserId = user.Id;
            kycObj.Status = KycStatus.True;
            
            
            await _authContext.AddAsync(kycObj);
            await _authContext.SaveChangesAsync();
            return Ok(new
            {
                Message = "KYC Posted!"
            });
        }

        
       
    }
}
