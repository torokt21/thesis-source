using System.ComponentModel.DataAnnotations;

namespace PhotoPortal.ASP.Models
{
    /// <summary>
    /// A package that is ordered by the customer.
    /// </summary>
    public class PackageOrder
    {
        /// <summary>
        /// The id of the ordered package.
        /// </summary>
        [Key]
        public int Id { get; set; }

        /// <summary>
        /// The package that contains this order.
        /// </summary>
        public virtual PackageInformation? PackageInformation { get; set; }

        /// <summary>
        /// The id of the package that contains this order.
        /// </summary>
        public int? PackageInformationId { get; set; }

        /// <summary>
        /// The items in the ordered package.
        /// </summary>
        public virtual List<OrderItem> Items { get; }
    }
}
