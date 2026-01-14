using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace PhotoPortal.ASP.Models
{
    /// <summary>
    /// The information of a package that can be purchased.
    /// </summary>
    public class PackageInformation
    {
        /// <summary>
        /// The id of the package.
        /// </summary>
        [Key]
        public int Id { get; set; }

        /// <summary>
        /// The name of the package.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// The description of the package.
        /// </summary>
        public string? Description { get; set; }

        /// <summary>
        /// The price of the package.
        /// </summary>
        [Range(0, int.MaxValue)]
        public int Price { get; set; }

        /// <summary>
        /// The list of requirements for this package.
        /// </summary>
        [ValidateNever]
        public virtual List<PackageRequirement> Requirements { get; } = new();

        /// <summary>
        /// Determines whether the package is orderable.
        /// </summary>
        [DefaultValue(true)]
        public bool Orderable { get; set; }

        /// <summary>
        /// The id of the photographer selling this package.
        /// </summary>
        public string? PhotographerId { get; set; }

        /// <summary>
        /// The photographer selling this package.
        /// </summary>
        [JsonIgnore]
        public virtual Photographer? Photographer { get; set; }

        /// <summary>
        /// The list of institutions this package is available for.
        /// </summary>ú
        [JsonIgnore]
        public virtual List<Institution> AvaliableIn { get; set; } = new();
    }
}
