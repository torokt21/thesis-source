using Microsoft.AspNetCore.Identity;

namespace PhotoPortal.ASP.Models
{
    /// <summary>
    /// A class representing a photographer.
    /// </summary>
    public class Photographer : IdentityUser
    {
        /// <summary>
        /// The name displayed.
        /// </summary>
        public string DisplayName { get; set; }

        /// <summary>
        /// The institutions that belong the this photographer.
        /// </summary>
        public virtual List<Institution> Institutions { get; } = new();

        /// <summary>
        /// The orders submitted to the photographer.
        /// </summary>
        public virtual List<Order> Orders { get; } = new(); 

        /// <summary>
        /// The products offered by the photographer.
        /// </summary>
        public virtual List<Product> Products { get; } = new();

        /// <summary>
        /// The packages offered by the photographer.
        /// </summary>
        public virtual List<PackageInformation> PackageInformations { get; } = new();
    }
}
