using Microsoft.EntityFrameworkCore;

namespace PhotoPortal.ASP.Data
{
    public class GenericRepository<T> where T : class
    {
        protected readonly ApplicationDbContext _context;
        protected DbSet<T> table = null;

        public GenericRepository(ApplicationDbContext context)
        {
            this._context = context;
            table = _context.Set<T>();
        }

        public virtual IEnumerable<T> GetAll()
        {
            return table.ToList();
        }

        public virtual T GetById(object id)
        {
            return table.Find(id);
        }

        public virtual void Insert(T obj)
        {
            table.Add(obj);
            this.Save();
        }


        public virtual void Update(T obj)
        {
            table.Attach(obj);
            _context.Entry(obj).State = EntityState.Modified;
            this.Save();
        }

        public virtual void Delete(object id)
        {
            T existing = table.Find(id);
            table.Remove(existing);
            this.Save();
        }

        public void Save()
        {
            _context.SaveChanges();
        }
    }
}
