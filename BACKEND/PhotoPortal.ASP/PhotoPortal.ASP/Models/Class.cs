using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace PhotoPortal.ASP.Models
{
    public class Class
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        public string Name { get; set; }

        [ForeignKey(nameof(Models.Institution))]
        public int InstitutionId { get; set; }

        [ValidateNever]
        [JsonIgnore]
        public virtual Institution Institution { get; set; }
    }
}
