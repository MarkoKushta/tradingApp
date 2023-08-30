using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using tradingAppCS.Context;
using tradingAppCS.Models;

namespace tradingAppCS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class UserController : ControllerBase
    {
        private readonly tradingAppDBContext _authContext;
        public UserController(tradingAppDBContext context)
        {
            _authContext = context;
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

            user.Balance = dollas;
            
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

            if (user == null)
                return NotFound(new { Message = "User not found!" });

            // Create a new instance of the PasswordHasher class
            var passwordHasher = new PasswordHasher<User>();

            // Verify the entered password
            var result = passwordHasher.VerifyHashedPassword(user, user.Password, userObj.Password);

            if (result == PasswordVerificationResult.Failed)
                return BadRequest(new { Message = "Invalid password!" });

            return Ok(new
            {
                Message = "Login Success!",
                UserId = user.Id,
                UserName = user.Username,
                Email = user.Email
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
