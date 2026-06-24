import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Upload, Store, Package, TrendingUp, Check } from 'lucide-react';
import { updateUser } from '../../features/auth/authSlice';
import { createStore } from '../../api/storeService';

const STEPS = [
  { icon: Store, title: 'Create your store', desc: 'Set up your profile with name, description and logo' },
  { icon: Package, title: 'Add your products', desc: 'Upload photos and list your handcrafted items' },
  { icon: TrendingUp, title: 'Start earning', desc: 'Receive 95% of every sale directly to your account' },
];

export default function BecomeSeller() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ storeName: '', description: '' });
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleLogoChange = e => {
    const file = e.target.files[0];
    if (file) { setLogo(file); setLogoPreview(URL.createObjectURL(file)); }
  };

  const handleSubmit = async e => {
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
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <div className="container mx-auto px-6 md:px-12 lg:px-16 py-16">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div className="lg:sticky lg:top-24">
            <p className="label-sm section-eyebrow mb-3">Become a Seller</p>
            <h1 className="font-display text-4xl font-bold mb-5" style={{ color: 'var(--text-primary)', lineHeight: '1.15' }}>
              Start selling your handcrafted products
            </h1>
            <p className="text-base leading-relaxed mb-10" style={{ color: 'var(--text-secondary)', maxWidth: '420px' }}>
              Join thousands of artisans on our platform. Set up your store in minutes and start reaching buyers worldwide.
            </p>

            <div className="space-y-4 mb-10">
              {STEPS.map((step, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-2xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'var(--primary-lightest)' }}>
                    <step.icon size={18} style={{ color: 'var(--primary)' }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{step.title}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-2xl text-white" style={{ background: 'linear-gradient(135deg, var(--text-primary), #3D2A1A)' }}>
              <p className="label-xs mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>Platform Commission</p>
              <p className="font-display text-5xl font-bold mb-1">Only 5%</p>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>You keep 95% of every sale</p>
            </div>
          </div>

          <div className="card-flat p-10">
            <h2 className="font-display text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
              Store Details
            </h2>

            {error && (
              <div className="flex items-center gap-2 p-4 rounded-xl mb-5 text-sm"
                style={{ background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.15)', color: '#dc2626' }}>
                ⚠ {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="form-label">Store Name *</label>
                <input type="text" name="storeName" value={formData.storeName} onChange={handleChange}
                  required placeholder="e.g. Clay & Co." className="input" />
              </div>

              <div>
                <label className="form-label">Store Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange}
                  rows={4} placeholder="Tell customers about your craft and story..." className="input" />
              </div>

              <div>
                <label className="form-label">Store Logo (optional)</label>
                <div className="upload-zone p-8 text-center" onClick={() => document.getElementById('logo-input').click()}>
                  {logoPreview ? (
                    <div className="flex flex-col items-center">
                      <img src={logoPreview} alt="Logo" className="w-20 h-20 rounded-2xl object-cover mb-3" />
                      <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Click to change</p>
                    </div>
                  ) : (
                    <>
                      <Upload size={28} className="mx-auto mb-3" style={{ color: 'var(--text-muted)' }} />
                      <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Click to upload logo</p>
                      <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>PNG, JPG up to 2MB</p>
                    </>
                  )}
                  <input id="logo-input" type="file" accept="image/*" onChange={handleLogoChange} className="hidden" />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => navigate('/')} className="btn btn-ghost flex-1 btn-lg">Cancel</button>
                <button type="submit" disabled={loading} className="btn btn-primary flex-1 btn-lg">
                  {loading ? <><div className="spinner"></div> Creating...</> : 'Create Store →'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
