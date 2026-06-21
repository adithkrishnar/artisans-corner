import { useState } from 'react';

const ShippingForm = ({ onSubmit, onBack }) => {
  const [formData, setFormData] = useState({ street: '', city: '', state: '', zip: '', country: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); onSubmit(formData); };

  return (
    <div className="card-flat">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: 'var(--terracotta)' }}>2</div>
        <h2 className="text-lg font-bold" style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-primary)' }}>
          Shipping Address
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-group">
          <label>Street Address *</label>
          <input type="text" name="street" value={formData.street} onChange={handleChange} required placeholder="123 Main Street" className="input-field" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="form-group">
            <label>City *</label>
            <input type="text" name="city" value={formData.city} onChange={handleChange} required placeholder="New York" className="input-field" />
          </div>
          <div className="form-group">
            <label>State *</label>
            <input type="text" name="state" value={formData.state} onChange={handleChange} required placeholder="NY" className="input-field" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="form-group">
            <label>ZIP Code *</label>
            <input type="text" name="zip" value={formData.zip} onChange={handleChange} required placeholder="10001" className="input-field" />
          </div>
          <div className="form-group">
            <label>Country *</label>
            <input type="text" name="country" value={formData.country} onChange={handleChange} required placeholder="United States" className="input-field" />
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button type="button" onClick={onBack} className="btn-ghost flex-1 py-3 text-sm">← Back</button>
          <button type="submit" className="btn-primary flex-1 py-3 text-sm">Continue to Payment →</button>
        </div>
      </form>
    </div>
  );
};

export default ShippingForm;