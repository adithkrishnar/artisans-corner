import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../../api/productService';

const CATEGORIES = ['Home Decor', 'Jewelry', 'Clothing', 'Art', 'Pottery', 'Woodwork', 'Candles', 'Textiles', 'Food & Drink', 'Other'];

const AddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: '', description: '', price: '', stock: '', category: '' });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
      await createProduct(data);
      navigate('/dashboard/seller');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--cream)' }}>
      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate('/dashboard/seller')} className="p-2 rounded-xl transition-all duration-200" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" style={{ color: 'var(--text-secondary)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div>
            <p className="section-label">Dashboard</p>
            <h1 className="text-2xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-primary)' }}>
              Add New Product
            </h1>
          </div>
        </div>

        <div className="grid md:grid-cols-5 gap-6">
          {/* Image Upload */}
          <div className="md:col-span-2">
            <div
              className="aspect-square rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all duration-200 overflow-hidden"
              style={{ background: imagePreview ? 'transparent' : 'var(--white)', border: '2px dashed var(--border)' }}
              onClick={() => document.getElementById('product-image').click()}
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center p-6">
                  <div className="text-5xl mb-3">📸</div>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)', fontFamily: 'DM Sans, sans-serif' }}>Click to upload image</p>
                  <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>PNG, JPG up to 2MB</p>
                </div>
              )}
              <input id="product-image" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </div>
            {imagePreview && (
              <button
                onClick={() => { setImage(null); setImagePreview(null); }}
                className="mt-2 w-full text-xs py-2 rounded-xl transition-all duration-200"
                style={{ color: '#dc2626', background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)', fontFamily: 'DM Sans, sans-serif' }}
              >
                Remove Image
              </button>
            )}
          </div>

          {/* Form */}
          <div className="md:col-span-3 card-flat">
            {error && (
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl mb-5 text-sm" style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)', color: '#dc2626' }}>
                <span>⚠</span> {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-group">
                <label>Product Title *</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} required placeholder="e.g. Handmade Wooden Bowl" className="input-field" />
              </div>

              <div className="form-group">
                <label>Description *</label>
                <textarea name="description" value={formData.description} onChange={handleChange} required rows={4} placeholder="Describe your product — materials used, dimensions, story..." className="input-field resize-none" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="form-group">
                  <label>Price ($) *</label>
                  <input type="number" name="price" value={formData.price} onChange={handleChange} required min="0" step="0.01" placeholder="0.00" className="input-field" />
                </div>
                <div className="form-group">
                  <label>Stock *</label>
                  <input type="number" name="stock" value={formData.stock} onChange={handleChange} required min="0" placeholder="0" className="input-field" />
                </div>
              </div>

              <div className="form-group">
                <label>Category *</label>
                <select name="category" value={formData.category} onChange={handleChange} required className="input-field">
                  <option value="">Select a category</option>
                  {CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => navigate('/dashboard/seller')} className="btn-ghost flex-1 py-3 text-sm">
                  Cancel
                </button>
                <button type="submit" disabled={loading} className="btn-primary flex-1 py-3 text-sm">
                  {loading ? (
                    <>
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                      </svg>
                      Publishing...
                    </>
                  ) : 'Publish Product →'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;