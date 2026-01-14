using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace PhotoPortal.ASP.Models
{
    /// <summary>
    /// The possible types of a product.
    /// </summary>
    public enum ProductType
    {
        /// <summary>
        /// A printed product such as a 10x15 cm printed picture.
        /// </summary>
        Printed,

        /// <summary>
        /// A gift such as a snowglobe with a picture inside.
        /// </summary>
        Gift
    }

    /// <summary>
    /// A class represetning a product that can be ordered.
    /// </summary>
    public class Product
    {
        /// <summary>
        /// The primary id of the product.
        /// </summary>
        [Key]
        public int Id { get; set; }
        /// <summary>
        /// The name of the product.
        /// </summary>
        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        /// <summary>
        /// The name of the product.
        /// </summary>
        [StringLength(200)]
        public string? Description { get; set; }

        /// <summary>
        /// The id of the photographer offering this product.
        /// </summary>
        public string? PhotographerId { get; set; }

        /// <summary>
        /// The photographer offering this product.
        /// </summary>
        [JsonIgnore]
        [ValidateNever]
        [IgnoreDataMember]
        public virtual Photographer? Photographer { get; }

        /// <summary>
        /// The price of the product.
        /// </summary>
        public int Price { get; set; }

        /// <summary>
        /// The type of the product.
        /// </summary>
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public ProductType Type { get; set; }

        /// <summary>
        /// Determines whether the product can be ordered.
        /// </summary>
        [DefaultValue(true)]
        public bool Orderable { get; set; }

        /// <summary>
        /// The list of institution this product is available for.
        /// </summary>
        [JsonIgnore]
        [ValidateNever]
        public virtual List<Institution> AvailableIn { get; }
    }
}
