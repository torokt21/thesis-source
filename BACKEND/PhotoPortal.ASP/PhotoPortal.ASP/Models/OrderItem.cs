using System.ComponentModel.DataAnnotations;

namespace PhotoPortal.ASP.Models
{
    /// <summary>
    /// A class representing an item in an order.
    /// </summary>
    public class OrderItem
    {
        /// <summary>
        /// The primary id of this order item.
        /// </summary>
        [Key]
        public int Id { get; set; }

        /// <summary>
        /// The product describing this order item.
        /// </summary>
        public int ProductId { get; set; }

        /// <summary>
        /// The product describing this order item.
        /// </summary>
        public virtual Product Product { get; set; }

        /// <summary>
        /// The id of the order this item belongs to.
        /// </summary>
        public int OrderId { get; set; }

        /// <summary>
        /// The order this item belongs to.
        /// </summary>
        public virtual Order Order { get; set; }

        /// <summary>
        /// The id of the picture this item is associated with.
        /// </summary>
        public int? PictureId { get; set; }

        /// <summary>
        /// The picture this item is associated with.
        /// </summary>
        public virtual Picture? Picture { get; set; }

        /// <summary>
        /// The quantity of the ordered item.
        /// </summary>
        [Required]
        [Range(0, 100)]
        public int Quantity { get; set; }

        /// <summary>
        /// The id of the package this item is in. Null, if the item is not in a package.
        /// </summary>
        public int? PackageId { get; set; }

        /// <summary>
        /// The package this item is in. Null, if the item is not in a package.
        /// </summary>
        public virtual PackageOrder? OrderedPackage { get; set; }
    }
}
