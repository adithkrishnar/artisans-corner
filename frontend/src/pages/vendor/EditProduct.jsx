import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById, updateProduct } from '../../api/productService';

const CATEGORIES = ['Home Decor', 'Jewelry', 'Clothing', 'Art', 'Pottery', 'Woodwork', 'Candles', 'Textiles', 'Food & Drink', 'Other'];

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: '', description: '', price: '', stock: '', category: '' });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductById(id);
        const p = res.data.product;
        setFormData({ title: p.title, description: p.description, price: p.price, stock: p.stock, category: p.category });
        setImagePreview(p.imageUrl);
      } catch (err) {
        setError('Failed to load product');
      } finally {
        setFetching(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
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
      setError(err.response?.data?.message || 'Failed to update product');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--cream)' }}>
        <div className="text-center">
          <div className="w-10 h-10 rounded-full border-2 border-t-transparent mx-auto mb-4 animate-spin" style={{ borderColor: 'var(--terracotta)', borderTopColor: 'transparent' }}></div>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Loading product...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--cream)' }}>
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate('/dashboard/seller')} className="p-2 rounded-xl" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" style={{ color: 'var(--text-secondary)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div>
            <p className="section-label">Dashboard</p>
            <h1 className="text-2xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-primary)' }}>Edit Product</h1>
          </div>
        </div>

        <div className="grid md:grid-cols-5 gap-6">
          <div className="md:col-span-2">
            <div
              className="aspect-square rounded-2xl flex flex-col items-center justify-center cursor-pointer overflow-hidden"
              style={{ background: imagePreview ? 'transparent' : 'var(--white)', border: '2px dashed var(--border)' }}
              onClick={() => document.getElementById('edit-image').click()}
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center p-6">
                  <div className="text-5xl mb-3">📸</div>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)', fontFamily: 'DM Sans, sans-serif' }}>Click to change image</p>
                </div>
              )}
              <input id="edit-image" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </div>
            <p className="text-xs text-center mt-2" style={{ color: 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif' }}>
              Click to change image
            </p>
          </div>

          <div className="md:col-span-3 card-flat">
            {error && (
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl mb-5 text-sm" style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)', color: '#dc2626' }}>
                <span>⚠</span> {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-group">
                <label>Product Title *</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} required className="input-field" />
              </div>
              <div className="form-group">
                <label>Description *</label>
                <textarea name="description" value={formData.description} onChange={handleChange} required rows={4} className="input-field resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="form-group">
                  <label>Price ($) *</label>
                  <input type="number" name="price" value={formData.price} onChange={handleChange} required min="0" step="0.01" className="input-field" />
                </div>
                <div className="form-group">
                  <label>Stock *</label>
                  <input type="number" name="stock" value={formData.stock} onChange={handleChange} required min="0" className="input-field" />
                </div>
              </div>
              <div className="form-group">
                <label>Category *</label>
                <select name="category" value={formData.category} onChange={handleChange} required className="input-field">
                  <option value="">Select category</option>
                  {CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => navigate('/dashboard/seller')} className="btn-ghost flex-1 py-3 text-sm">Cancel</button>
                <button type="submit" disabled={loading} className="btn-primary flex-1 py-3 text-sm">
                  {loading ? 'Saving...' : 'Save Changes →'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;