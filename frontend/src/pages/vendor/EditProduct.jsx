import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Upload } from 'lucide-react';
import { getProductById, updateProduct } from '../../api/productService';

const CATEGORIES = ['Home Decor','Jewelry','Clothing','Art','Pottery','Woodwork','Candles','Textiles','Food & Drink','Other'];

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: '', description: '', price: '', stock: '', category: '' });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await getProductById(id);
        const p = res.data.product;
        setFormData({ title: p.title, description: p.description, price: p.price, stock: p.stock, category: p.category });
        setImagePreview(p.imageUrl);
      } catch { setError('Failed to load product'); }
      finally { setFetching(false); }
    })();
  }, [id]);

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleImageChange = e => { const f = e.target.files[0]; if (f) { setImage(f); setImagePreview(URL.createObjectURL(f)); } };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([k, v]) => data.append(k, v));
      if (image) data.append('image', image);
      await updateProduct(id, data);
      navigate('/dashboard/seller');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update');
    } finally { setLoading(false); }
  };

  if (fetching) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
      <div className="spinner-primary" style={{ width: '2rem', height: '2rem', borderWidth: '3px' }}></div>
    </div>
  );

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <div className="container py-8" style={{ maxWidth: '860px' }}>
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate('/dashboard/seller')} className="btn btn-ghost btn-sm" style={{ padding: '0.5rem' }}>
            <ArrowLeft size={18} />
          </button>
          <div>
            <p className="label-sm section-eyebrow">Dashboard</p>
            <h1 className="font-display text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Edit Product</h1>
          </div>
        </div>

        <div className="grid md:grid-cols-5 gap-6">
          <div className="md:col-span-2">
            <div className="upload-zone overflow-hidden"
              style={{ aspectRatio: '1', border: imagePreview ? 'none' : undefined, borderRadius: 'var(--radius-xl)', cursor: 'pointer' }}
              onClick={() => document.getElementById('ep-img').click()}>
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                  <Upload size={32} className="mb-3" style={{ color: 'var(--text-muted)' }} />
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Click to change image</p>
                </div>
              )}
              <input id="ep-img" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </div>
          </div>

          <div className="md:col-span-3 card-flat">
            {error && (
              <div className="flex items-center gap-2 p-4 rounded-xl mb-5 text-sm"
                style={{ background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.15)', color: '#dc2626' }}>
                ⚠ {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="form-label">Product Title *</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} required className="input" />
              </div>
              <div>
                <label className="form-label">Description *</label>
                <textarea name="description" value={formData.description} onChange={handleChange} required rows={4} className="input" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Price ($) *</label>
                  <input type="number" name="price" value={formData.price} onChange={handleChange} required min="0" step="0.01" className="input" />
                </div>
                <div>
                  <label className="form-label">Stock *</label>
                  <input type="number" name="stock" value={formData.stock} onChange={handleChange} required min="0" className="input" />
                </div>
              </div>
              <div>
                <label className="form-label">Category *</label>
                <select name="category" value={formData.category} onChange={handleChange} required className="input">
                  <option value="">Select category</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => navigate('/dashboard/seller')} className="btn btn-ghost flex-1 btn-lg">Cancel</button>
                <button type="submit" disabled={loading} className="btn btn-primary flex-1 btn-lg">
                  {loading ? <><div className="spinner"></div> Saving...</> : 'Save Changes →'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}