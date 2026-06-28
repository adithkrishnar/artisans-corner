import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Upload, Store, Package, TrendingUp, ImagePlus, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { updateUser } from '../../features/auth/authSlice';
import { createStore } from '../../api/storeService';

const STEPS = [
  {
    icon: Store,
    title: 'Create your store',
    desc: 'Set up your profile with a name, description and logo in minutes.',
    color: 'rgba(122,82,48,0.1)',
    iconColor: 'var(--primary)',
  },
  {
    icon: Package,
    title: 'Add your products',
    desc: 'Upload beautiful photos and list your handcrafted items easily.',
    color: 'rgba(196,122,74,0.1)',
    iconColor: 'var(--accent)',
  },
  {
    icon: TrendingUp,
    title: 'Start earning',
    desc: 'Receive 95% of every sale directly deposited to your account.',
    color: 'rgba(16,185,129,0.1)',
    iconColor: '#059669',
  },
];

// Inline SVG artisan illustration
function ArtisanIllustration() {
  return (
    <svg viewBox="0 0 380 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Background circles */}
      <circle cx="190" cy="160" r="140" fill="rgba(122,82,48,0.04)" />
      <circle cx="190" cy="160" r="100" fill="rgba(196,122,74,0.05)" />

      {/* Pottery wheel base */}
      <ellipse cx="190" cy="240" rx="80" ry="18" fill="rgba(122,82,48,0.12)" />
      <rect x="168" y="210" width="44" height="32" rx="6" fill="#C47A4A" opacity="0.5" />
      <ellipse cx="190" cy="213" rx="42" ry="10" fill="#7A5230" opacity="0.6" />

      {/* Clay pot being shaped */}
      <ellipse cx="190" cy="190" rx="34" ry="10" fill="rgba(196,122,74,0.3)" />
      <path d="M156 190 Q148 160 162 138 Q176 120 190 118 Q204 120 218 138 Q232 160 224 190Z"
        fill="url(#potGrad)" opacity="0.85" />
      <ellipse cx="190" cy="118" rx="18" ry="7" fill="rgba(122,82,48,0.4)" />
      <path d="M162 165 Q175 155 190 157 Q205 155 218 165" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" fill="none" />
      <path d="M158 178 Q173 170 190 172 Q207 170 222 178" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="none" />

      {/* Artisan hands */}
      <path d="M148 175 Q140 168 142 158 Q144 150 152 148 Q158 147 162 154 L165 162 Q160 172 148 175Z"
        fill="#C47A4A" opacity="0.7" />
      <path d="M232 175 Q240 168 238 158 Q236 150 228 148 Q222 147 218 154 L215 162 Q220 172 232 175Z"
        fill="#C47A4A" opacity="0.7" />

      {/* Tools floating around */}
      {/* Paintbrush */}
      <g transform="rotate(-30 100 90)">
        <rect x="90" y="68" width="4" height="28" rx="2" fill="#7A5230" opacity="0.6" />
        <path d="M88 96 Q92 106 92 110 Q90 106 92 102" fill="#C47A4A" opacity="0.7" />
      </g>
      {/* Scissor / tool */}
      <g transform="rotate(20 280 100)">
        <rect x="276" y="82" width="3" height="22" rx="1.5" fill="#7A5230" opacity="0.5" />
        <rect x="281" y="82" width="3" height="22" rx="1.5" fill="#C47A4A" opacity="0.5" />
        <circle cx="278" cy="107" r="4" fill="none" stroke="rgba(122,82,48,0.4)" strokeWidth="1.5" />
      </g>

      {/* Sparkle dots */}
      <circle cx="120" cy="130" r="4" fill="var(--accent)" opacity="0.5" />
      <circle cx="260" cy="125" r="3" fill="var(--primary)" opacity="0.4" />
      <circle cx="100" cy="200" r="2.5" fill="var(--accent)" opacity="0.35" />
      <circle cx="280" cy="210" r="2" fill="var(--primary)" opacity="0.3" />
      <circle cx="150" cy="80" r="2" fill="var(--accent)" opacity="0.4" />
      <circle cx="240" cy="75" r="3" fill="var(--primary)" opacity="0.35" />

      {/* Stars/sparkles */}
      <path d="M310 150 L312 144 L314 150 L320 152 L314 154 L312 160 L310 154 L304 152Z"
        fill="var(--accent)" opacity="0.4" />
      <path d="M65 145 L67 141 L69 145 L73 147 L69 149 L67 153 L65 149 L61 147Z"
        fill="var(--primary)" opacity="0.35" />

      {/* Leaf / nature element */}
      <path d="M330 190 Q340 175 350 185 Q340 195 330 190Z" fill="rgba(16,185,129,0.3)" />
      <path d="M45 195 Q35 178 48 182 Q50 190 45 195Z" fill="rgba(16,185,129,0.25)" />

      <defs>
        <linearGradient id="potGrad" x1="156" y1="118" x2="224" y2="190" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#C47A4A" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#7A5230" stopOpacity="0.9" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function BecomeSeller() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ storeName: '', description: '' });
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogoChange = e => {
    const file = e.target.files[0];
    if (file) { setLogo(file); setLogoPreview(URL.createObjectURL(file)); }
  };

  const handleDrop = e => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setLogo(file);
      setLogoPreview(URL.createObjectURL(file));
    }
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
    <div style={{ background: 'var(--bg)', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Subtle background pattern */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle at 15% 50%, rgba(196,122,74,0.07) 0%, transparent 55%), radial-gradient(circle at 85% 20%, rgba(122,82,48,0.06) 0%, transparent 50%)',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.025,
          backgroundImage: 'linear-gradient(rgba(122,82,48,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(122,82,48,0.8) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container mx-auto relative" style={{ zIndex: 1, padding: '3.5rem 2rem 4rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
          gap: '3.5rem',
          alignItems: 'center',
        }}
          className="lg:grid seller-grid"
        >
          {/* ─── LEFT PANEL ─── */}
          <div style={{ position: 'sticky', top: '6rem' }}>
            {/* Eyebrow */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.125rem' }}>
              <Sparkles size={14} style={{ color: 'var(--accent)' }} />
              <span className="label-sm" style={{ color: 'var(--accent)' }}>Become a Seller</span>
            </div>

            <h1
              className="font-display"
              style={{ fontSize: 'clamp(1.875rem, 3.5vw, 2.75rem)', fontWeight: 700, lineHeight: 1.15, color: 'var(--text-primary)', marginBottom: '0.875rem' }}
            >
              Start selling your<br />
              <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>handcrafted</span> products
            </h1>

            <p style={{ fontSize: '0.9375rem', lineHeight: 1.7, color: 'var(--text-secondary)', maxWidth: '400px', marginBottom: '2rem' }}>
              Join thousands of artisans on our platform. Set up your store in minutes and start reaching buyers worldwide.
            </p>

            {/* Artisan illustration */}
            <div
              style={{
                width: '100%', maxWidth: '340px',
                height: '200px',
                marginBottom: '1.875rem',
                borderRadius: 'var(--radius-2xl)',
                background: 'linear-gradient(135deg, rgba(248,245,241,0.8) 0%, rgba(252,250,246,0.9) 100%)',
                border: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <ArtisanIllustration />
            </div>

            {/* Step cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.75rem' }}>
              {STEPS.map((step, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex', alignItems: 'flex-start', gap: '1rem',
                    padding: '1rem 1.125rem',
                    borderRadius: 'var(--radius-xl)',
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    boxShadow: 'var(--shadow-xs)',
                    transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)',
                    cursor: 'default',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                    e.currentTarget.style.borderColor = 'var(--border-strong)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-xs)';
                    e.currentTarget.style.borderColor = 'var(--border)';
                  }}
                >
                  {/* Step number + icon */}
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    <div style={{
                      width: '44px', height: '44px', borderRadius: 'var(--radius-lg)',
                      background: step.color,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <step.icon size={20} style={{ color: step.iconColor }} />
                    </div>
                    <span style={{
                      position: 'absolute', top: '-6px', right: '-6px',
                      width: '18px', height: '18px', borderRadius: '50%',
                      background: 'var(--primary)', color: '#fff',
                      fontSize: '0.6rem', fontWeight: 700,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'DM Sans, sans-serif',
                      border: '2px solid var(--bg)',
                    }}>{i + 1}</span>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>{step.title}</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{step.desc}</p>
                  </div>
                  <CheckCircle2 size={16} style={{ color: 'var(--border-strong)', flexShrink: 0, marginTop: '2px', transition: 'color 0.2s' }} />
                </div>
              ))}
            </div>

            {/* Commission card — fixed clipping */}
            <div
              style={{
                padding: '1.5rem 1.75rem',
                borderRadius: 'var(--radius-2xl)',
                background: 'linear-gradient(135deg, var(--text-primary) 0%, #3D2A1A 60%, #5C3D22 100%)',
                position: 'relative', overflow: 'hidden',
                boxShadow: 'var(--shadow-lg)',
              }}
            >
              {/* Decorative ring */}
              <div style={{
                position: 'absolute', right: '-24px', top: '-24px',
                width: '120px', height: '120px', borderRadius: '50%',
                border: '2px solid rgba(196,122,74,0.2)',
                pointerEvents: 'none',
              }} />
              <div style={{
                position: 'absolute', right: '-8px', top: '-8px',
                width: '80px', height: '80px', borderRadius: '50%',
                background: 'rgba(196,122,74,0.08)',
                pointerEvents: 'none',
              }} />

              <p
                className="label-xs"
                style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '0.625rem', letterSpacing: '0.1em' }}
              >
                Platform Commission
              </p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <span
                  className="font-display"
                  style={{
                    fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                    fontWeight: 800,
                    color: '#fff',
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                    display: 'block',
                  }}
                >
                  Only 5%
                </span>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>
                You keep <strong style={{ color: 'var(--accent)', fontWeight: 700 }}>95%</strong> of every sale — one of the lowest rates in the industry.
              </p>
            </div>
          </div>

          {/* ─── RIGHT PANEL: FORM ─── */}
          <div
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-2xl)',
              padding: '2.5rem',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            <div style={{ marginBottom: '2rem' }}>
              <h2
                className="font-display"
                style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.375rem' }}
              >
                Store Details
              </h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Fill in the details below to create your artisan store.</p>
            </div>

            {error && (
              <div
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.625rem',
                  padding: '0.875rem 1rem', borderRadius: 'var(--radius-md)',
                  marginBottom: '1.5rem',
                  background: 'rgba(220,38,38,0.06)',
                  border: '1px solid rgba(220,38,38,0.15)',
                  color: '#dc2626', fontSize: '0.875rem',
                }}
              >
                ⚠ {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Store Name */}
              <div>
                <label className="form-label" style={{ marginBottom: '0.5rem' }}>Store Name <span style={{ color: 'var(--accent)' }}>*</span></label>
                <input
                  type="text"
                  name="storeName"
                  value={formData.storeName}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Clay & Co."
                  className="input"
                  style={{
                    padding: '0.875rem 1.125rem',
                    fontSize: '0.9375rem',
                    borderRadius: 'var(--radius-lg)',
                    transition: 'all 0.2s ease',
                  }}
                  onFocus={e => {
                    e.target.style.borderColor = 'var(--border-focus)';
                    e.target.style.boxShadow = '0 0 0 4px rgba(196,122,74,0.1)';
                    e.target.style.background = 'var(--bg-soft)';
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = 'var(--border)';
                    e.target.style.boxShadow = 'none';
                    e.target.style.background = 'var(--surface)';
                  }}
                />
              </div>

              {/* Store Description */}
              <div>
                <label className="form-label" style={{ marginBottom: '0.5rem' }}>Store Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell customers about your craft, story, and what makes your work special..."
                  className="input"
                  style={{
                    padding: '0.875rem 1.125rem',
                    fontSize: '0.9375rem',
                    borderRadius: 'var(--radius-lg)',
                    resize: 'vertical',
                    minHeight: '110px',
                    transition: 'all 0.2s ease',
                  }}
                  onFocus={e => {
                    e.target.style.borderColor = 'var(--border-focus)';
                    e.target.style.boxShadow = '0 0 0 4px rgba(196,122,74,0.1)';
                    e.target.style.background = 'var(--bg-soft)';
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = 'var(--border)';
                    e.target.style.boxShadow = 'none';
                    e.target.style.background = 'var(--surface)';
                  }}
                />
              </div>

              {/* Upload area */}
              <div>
                <label className="form-label" style={{ marginBottom: '0.5rem' }}>Store Logo <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(optional)</span></label>
                <div
                  onClick={() => document.getElementById('logo-input').click()}
                  onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  style={{
                    border: `2px dashed ${dragOver ? 'var(--accent)' : logoPreview ? 'var(--primary)' : 'var(--border-strong)'}`,
                    borderRadius: 'var(--radius-xl)',
                    padding: '2rem 1.5rem',
                    textAlign: 'center',
                    cursor: 'pointer',
                    background: dragOver
                      ? 'rgba(196,122,74,0.06)'
                      : logoPreview
                        ? 'rgba(122,82,48,0.04)'
                        : 'var(--bg)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    if (!dragOver) {
                      e.currentTarget.style.borderColor = 'var(--accent)';
                      e.currentTarget.style.background = 'rgba(196,122,74,0.04)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!dragOver) {
                      e.currentTarget.style.borderColor = logoPreview ? 'var(--primary)' : 'var(--border-strong)';
                      e.currentTarget.style.background = logoPreview ? 'rgba(122,82,48,0.04)' : 'var(--bg)';
                    }
                  }}
                >
                  {logoPreview ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                      <img
                        src={logoPreview}
                        alt="Logo preview"
                        style={{ width: '72px', height: '72px', borderRadius: 'var(--radius-xl)', objectFit: 'cover', border: '2px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}
                      />
                      <div>
                        <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.125rem' }}>Logo uploaded!</p>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Click or drag to replace</p>
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.625rem' }}>
                      <div style={{
                        width: '52px', height: '52px', borderRadius: 'var(--radius-xl)',
                        background: 'rgba(122,82,48,0.08)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        marginBottom: '0.25rem',
                        transition: 'background 0.2s',
                      }}>
                        <ImagePlus size={24} style={{ color: 'var(--primary)' }} />
                      </div>
                      <div>
                        <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                          <span style={{ color: 'var(--accent)', textDecoration: 'underline', textDecorationStyle: 'dotted' }}>Click to upload</span> or drag & drop
                        </p>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>PNG, JPG, WEBP — up to 2MB</p>
                      </div>
                    </div>
                  )}
                  <input id="logo-input" type="file" accept="image/*" onChange={handleLogoChange} className="hidden" style={{ display: 'none' }} />
                </div>
              </div>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: '0.875rem', paddingTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  style={{
                    flex: 1,
                    padding: '0.875rem',
                    borderRadius: 'var(--radius-lg)',
                    border: '1.5px solid var(--border-strong)',
                    background: 'transparent',
                    color: 'var(--text-secondary)',
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '0.9375rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'var(--bg)';
                    e.currentTarget.style.borderColor = 'var(--primary)';
                    e.currentTarget.style.color = 'var(--primary)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.borderColor = 'var(--border-strong)';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    flex: 2,
                    padding: '0.875rem',
                    borderRadius: 'var(--radius-lg)',
                    border: 'none',
                    background: loading ? 'rgba(122,82,48,0.5)' : 'var(--primary)',
                    color: '#fff',
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '0.9375rem',
                    fontWeight: 600,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)',
                    boxShadow: loading ? 'none' : '0 2px 8px rgba(122,82,48,0.3)',
                  }}
                  onMouseEnter={e => {
                    if (!loading) {
                      e.currentTarget.style.background = 'var(--primary-hover)';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(122,82,48,0.35)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!loading) {
                      e.currentTarget.style.background = 'var(--primary)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(122,82,48,0.3)';
                    }
                  }}
                >
                  {loading ? (
                    <>
                      <div className="spinner" />
                      Creating store...
                    </>
                  ) : (
                    <>
                      Create My Store
                      <ArrowRight size={17} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .seller-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </div>
  );
}
