import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../features/auth/authSlice';
import { createStore } from '../../api/storeService';

const BecomeSeller = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ storeName: '', description: '' });
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = new FormData();
      data.append('storeName', formData.storeName);
      data.append('description', formData.description);
      if (logo) data.append('logo', logo);
      await createStore(data);
      dispatch(updateUser({ isVendor: true, role: 'vendor' }));
      navigate('/dashboard/seller');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create store');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--cream)' }}>
      <div className="max-w-5xl mx-auto px-4 py-14">
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Left - Info */}
          <div className="lg:sticky lg:top-24">
            <p className="section-label mb-3">Become a Seller</p>
            <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-primary)' }}>
              Start selling your handcrafted products
            </h1>
            <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--text-secondary)', fontFamily: 'DM Sans, sans-serif' }}>
              Join thousands of artisans on our platform. Set up your store in minutes and start reaching buyers worldwide.
            </p>

            <div className="space-y-4 mb-8">
              {[
                { icon: '🏪', title: 'Create your store', desc: 'Set up your profile with a name, description and logo' },
                { icon: '📦', title: 'Add your products', desc: 'Upload photos and list your handcrafted items' },
                { icon: '💰', title: 'Start earning', desc: 'Receive 95% of every sale directly to your account' },
              ].map((step, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-2xl" style={{ background: 'var(--white)', border: '1px solid var(--border)' }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-xl" style={{ background: 'rgba(196,113,74,0.08)' }}>
                    {step.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)', fontFamily: 'DM Sans, sans-serif' }}>{step.title}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif' }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 rounded-2xl" style={{ background: 'linear-gradient(135deg, var(--brown), var(--clay))', color: 'white' }}>
              <p className="text-sm font-bold mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>Platform Commission</p>
              <p className="text-4xl font-bold mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>Only 5%</p>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'DM Sans, sans-serif' }}>You keep 95% of every sale</p>
            </div>
          </div>

          {/* Right - Form */}
          <div className="card-flat">
            <h2 className="text-xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-primary)' }}>
              Store Details
            </h2>

            {error && (
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl mb-5 text-sm" style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)', color: '#dc2626' }}>
                <span>⚠</span> {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="form-group">
                <label>Store Name *</label>
                <input type="text" name="storeName" value={formData.storeName} onChange={handleChange} required placeholder="e.g. Clay & Co." className="input-field" />
              </div>

              <div className="form-group">
                <label>Store Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell customers about your craft, your story, what makes your products special..."
                  className="input-field resize-none"
                />
              </div>

              <div className="form-group">
                <label>Store Logo (optional)</label>
                <div
                  className="relative flex flex-col items-center justify-center p-8 rounded-2xl cursor-pointer transition-all duration-200"
                  style={{ border: '2px dashed var(--border)', background: 'var(--cream)' }}
                  onClick={() => document.getElementById('logo-input').click()}
                >
                  {logoPreview ? (
                    <img src={logoPreview} alt="Logo preview" className="w-20 h-20 rounded-2xl object-cover mb-3" />
                  ) : (
                    <div className="text-4xl mb-3">🖼️</div>
                  )}
                  <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)', fontFamily: 'DM Sans, sans-serif' }}>
                    {logoPreview ? 'Click to change logo' : 'Click to upload logo'}
                  </p>
                  <p className="text-xs mt-1" style={{ color: 'var(--text-muted)', fontFamily: 'DM Sans, sans-serif' }}>
                    PNG, JPG up to 2MB
                  </p>
                  <input id="logo-input" type="file" accept="image/*" onChange={handleLogoChange} className="hidden" />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => navigate('/')} className="btn-ghost flex-1 py-3 text-sm">
                  Cancel
                </button>
                <button type="submit" disabled={loading} className="btn-primary flex-1 py-3 text-sm">
                  {loading ? (
                    <>
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                      </svg>
                      Creating Store...
                    </>
                  ) : 'Create Store →'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeSeller;