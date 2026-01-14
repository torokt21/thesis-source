using System.ComponentModel.DataAnnotations;

namespace PhotoPortal.ASP.Models
{
    public class ShippingMethod
    {
        /// <summary>
        /// The primary id of the shipping method.
        /// </summary>
        [Key]
        public int Id { get; set; }

        /// <summary>
        /// The long name of the shipping method.
        /// </summary>
        [Required]
        public string Longname { get; set; }

        /// <summary>
        /// The short name of the shipping method.
        /// </summary>
        [Required]
        public string Shortname { get; set; }

        /// <summary>
        /// The icon name of the shipping method from Google Fonts.
        /// </summary>
        [Required]
        public string Icon { get; set; }

        /// <summary>
        /// The shipping fee of the shipping method.
        /// </summary>
        [Required]
        [Range(0, int.MaxValue)]
        public int Fee { get; set; }

        /// <summary>
        /// Determines whether customers can select this shipping method.
        /// </summary>
        public bool Avaliable { get; set; }
    }
}
