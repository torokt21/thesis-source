using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PhotoPortal.ASP.Models
{
    /// <summary>
    /// A class representing a picture.
    /// </summary>
    public class Picture
    {
        /// <summary>
        /// The id of the picture.
        /// </summary>
        [Key]
        public int Id { get; set; }

        /// <summary>
        /// The id of the child on the picture.
        /// </summary>
        public int ChildId { get; set; }

        /// <summary>
        /// The child on the picture.
        /// </summary>
        public virtual Child Child { get; set; }

        /// <summary>
        /// The filename of the picture.
        /// </summary>
        [StringLength(50)]
        public string Filename { get; set; }
    }
}
