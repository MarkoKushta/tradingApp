using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace tradingAppCS.Models;

public class kycTable
{
    [Key]
    public int? Id { get; set; }
    public KycStatus Status { get; set; }
    public DateTime KYCDate { get; set; }
    public int UserId { get; set; }
    public string CardNumber { get; set; }
    public string CardHolderName  { get; set; }
    public string ExpirationDate { get; set; }
    public string CVV { get; set; }
    public User? User { get; set; }
    public string PhoneNumber { get; set; }
    public string Address { get; set; }
}

public enum KycStatus
{
    False, True
}