using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PhotoPortal.ASP.Models
{
    /// <summary>
    /// A class representing a child.
    /// </summary>
    public class Child
    {
        /// <summary>
        /// The id of the child.
        /// </summary>
        [Key]
        public int Id { get; set; }

        /// <summary>
        /// The id of the institution the child belongs to.
        /// </summary>
        [ForeignKey(nameof(Models.Institution))]
        public int InstitutionId { get; set; }

        /// <summary>
        /// The passcode belinging to the child.
        /// </summary>
        public string Passcode { get; set; }

        /// <summary>
        /// The institution the child belongs to.
        /// </summary>
        [NotMapped]
        public virtual Institution Institution { get; set; }

        /// <summary>
        /// The pictures taken of the child.
        /// </summary>
        [NotMapped]
        public virtual List<Picture> Pictures { get; }
    }
}
