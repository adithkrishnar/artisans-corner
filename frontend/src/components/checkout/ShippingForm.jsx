import { useState } from 'react';
import { MapPin } from 'lucide-react';

export default function ShippingForm({ onSubmit, onBack }) {
  const [formData, setFormData] = useState({ street: '', city: '', state: '', zip: '', country: '' });
  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = e => { e.preventDefault(); onSubmit(formData); };

  return (
    <div className="card-flat">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: 'var(--primary)' }}>2</div>
        <h2 className="font-display text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Shipping Address</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="form-label">Street Address *</label>
          <input type="text" name="street" value={formData.street} onChange={handleChange} required placeholder="123 Main Street" className="input" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="form-label">City *</label><input type="text" name="city" value={formData.city} onChange={handleChange} required placeholder="New York" className="input" /></div>
          <div><label className="form-label">State *</label><input type="text" name="state" value={formData.state} onChange={handleChange} required placeholder="NY" className="input" /></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="form-label">ZIP Code *</label><input type="text" name="zip" value={formData.zip} onChange={handleChange} required placeholder="10001" className="input" /></div>
          <div><label className="form-label">Country *</label><input type="text" name="country" value={formData.country} onChange={handleChange} required placeholder="United States" className="input" /></div>
        </div>
        <div className="flex gap-3 pt-2">
          <button type="button" onClick={onBack} className="btn btn-ghost flex-1 btn-lg">← Back</button>
          <button type="submit" className="btn btn-primary flex-1 btn-lg">Continue to Payment →</button>
        </div>
      </form>
    </div>
  );
}