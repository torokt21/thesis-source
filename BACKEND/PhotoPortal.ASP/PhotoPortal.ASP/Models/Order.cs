using System.ComponentModel.DataAnnotations;

namespace PhotoPortal.ASP.Models
{
    /// <summary>
    /// A submitted order.
    /// </summary>
    public class Order
    {
        /// <summary>
        /// The id of the order.
        /// </summary>
        [Key]
        public int Id { get; set; }

        /// <summary>
        /// The items in this order.
        /// </summary>
        public virtual List<OrderItem> Items { get; }

        /// <summary>
        /// The id of the photographer this order belongs to.
        /// </summary>
        public string? PhotographerId { get; set; }

        /// <summary>
        /// The photographer this order belongs to.
        /// </summary>
        public virtual Photographer? Photographer { get; set; }

        /// <summary>
        /// The id of the shipping method selected by the customer.
        /// </summary>
        public int? ShippingMethodId { get; set; }

        /// <summary>
        /// The shipping method selected by the customer.
        /// </summary>
        public virtual ShippingMethod? ShippingMethod { get; set; }

        /// <summary>
        /// The id of the payment method selected by the customer.
        /// </summary>
        public int? PaymentMethodId { get; set; }

        /// <summary>
        /// The shipping method selected by the customer.
        /// </summary>
        public virtual PaymentMethod? PaymentMethod { get; set; }

        /// <summary>
        /// The first name of the customer.
        /// </summary>
        public string Firstname { get; set; }

        /// <summary>
        /// The last name of the customer
        /// </summary>
        public string Lastname { get; set; }
    }
}
