import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, X } from 'lucide-react';
import { createProduct } from '../../api/productService';

const CATEGORIES = ['Home Decor','Jewelry','Clothing','Art','Pottery','Woodwork','Candles','Textiles','Food & Drink','Other'];

export default function AddProduct() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: '', description: '', price: '', stock: '', category: '' });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) { setImage(file); setImagePreview(URL.createObjectURL(file)); }
  };

  const handleSubmit = async e => {
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
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <div className="container mx-auto px-6 md:px-12 lg:px-16 py-12" style={{ maxWidth: '960px' }}>
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <button onClick={() => navigate('/dashboard/seller')}
            className="btn btn-ghost btn-sm" style={{ padding: '0.5rem' }}>
            <ArrowLeft size={18} />
          </button>
          <div>
            <p className="label-sm section-eyebrow">Dashboard</p>
            <h1 className="font-display text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Add New Product</h1>
          </div>
        </div>

        <div className="grid md:grid-cols-5 gap-10">
          {/* Image Upload */}
          <div className="md:col-span-2 space-y-3">
            <div
              className="upload-zone overflow-hidden"
              style={{ aspectRatio: '1', background: imagePreview ? 'transparent' : undefined, border: imagePreview ? 'none' : undefined, borderRadius: 'var(--radius-xl)' }}
              onClick={() => document.getElementById('p-img').click()}>
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                  <Upload size={32} className="mb-3" style={{ color: 'var(--text-muted)' }} />
                  <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Click to upload</p>
                  <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>PNG, JPG up to 2MB</p>
                </div>
              )}
              <input id="p-img" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </div>
            {imagePreview && (
              <button onClick={() => { setImage(null); setImagePreview(null); }} className="btn btn-danger btn-sm w-full">
                <X size={14} /> Remove Image
              </button>
            )}
          </div>

          {/* Form */}
          <div className="md:col-span-3 card-flat p-8">
            {error && (
              <div className="flex items-center gap-2 p-4 rounded-xl mb-5 text-sm"
                style={{ background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.15)', color: '#dc2626' }}>
                ⚠ {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="form-label">Product Title *</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange}
                  required placeholder="e.g. Handmade Wooden Bowl" className="input" />
              </div>
              <div>
                <label className="form-label">Description *</label>
                <textarea name="description" value={formData.description} onChange={handleChange}
                  required rows={4} placeholder="Describe your product — materials, dimensions, story..." className="input" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Price ($) *</label>
                  <input type="number" name="price" value={formData.price} onChange={handleChange}
                    required min="0" step="0.01" placeholder="0.00" className="input" />
                </div>
                <div>
                  <label className="form-label">Stock *</label>
                  <input type="number" name="stock" value={formData.stock} onChange={handleChange}
                    required min="0" placeholder="0" className="input" />
                </div>
              </div>
              <div>
                <label className="form-label">Category *</label>
                <select name="category" value={formData.category} onChange={handleChange} required className="input">
                  <option value="">Select a category</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => navigate('/dashboard/seller')} className="btn btn-ghost flex-1 btn-lg">Cancel</button>
                <button type="submit" disabled={loading} className="btn btn-primary flex-1 btn-lg">
                  {loading ? <><div className="spinner"></div> Publishing...</> : 'Publish Product →'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
