using System.ComponentModel.DataAnnotations;

namespace PhotoPortal.ASP.Models
{
    /// <summary>
    /// A possible payment method.
    /// </summary>
    public class PaymentMethod
    {
        /// <summary>
        /// The primary id of the payment method.
        /// </summary>
        [Key]
        public int Id { get; set; }

        /// <summary>
        /// The long name of the payment method.
        /// </summary>
        [Required]
        public string Longname { get; set; }

        /// <summary>
        /// The short name of the payment method.
        /// </summary>
        [Required]
        public string Shortname { get; set; }

        /// <summary>
        /// The icon name of the payment method from Google Fonts.
        /// </summary>
        [Required]
        public string Icon { get; set; }

        /// <summary>
        /// The payment fee of the payment method.
        /// </summary>
        public int Fee { get; set; }

        /// <summary>
        /// Determines whether customers can select this payment method.
        /// </summary>
        public bool Available { get; set; }
    }
}
