import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

// ============================================
// GESTIONALE CONTABILITÀ STUDIO PROFESSIONALE
// ============================================

// Database iniziale di esempio
const initialData = {
  impostazioni: {
    iva: 0.22,
    ritenuta: 0.20,
    cassa: 0.04,
    studio: {
      nome: "Studio Professionale",
      indirizzo: "Via Roma 1",
      citta: "Milano",
      piva: "IT12345678901",
      email: "info@studio.it",
      telefono: "02 1234567"
    }
  },
  centriDiCosto: [
    { id: 1, nome: "Software", codice: "10" },
    { id: 2, nome: "Telefono", codice: "20" },
    { id: 3, nome: "Energia elettrica", codice: "30" },
    { id: 4, nome: "Personale", codice: "50" },
    { id: 5, nome: "Abbonamenti", codice: "60" },
    { id: 6, nome: "Servizi web", codice: "70" },
    { id: 7, nome: "Hardware", codice: "80" },
    { id: 8, nome: "Manutenzioni", codice: "85" },
    { id: 9, nome: "Imposte", codice: "90" },
  ],
  servizi: [
    { id: 1, nome: "Contabilità", importoStd: 1200 },
    { id: 2, nome: "Bilancio", importoStd: 500 },
    { id: 3, nome: "Modello Unico", importoStd: 300 },
    { id: 4, nome: "Mod. 770 + CUD", importoStd: 200 },
    { id: 5, nome: "Fatturazione elettronica", importoStd: 150 },
    { id: 6, nome: "Consulenza", importoStd: 100 },
    { id: 7, nome: "Dichiarativi fiscali", importoStd: 400 },
    { id: 8, nome: "Autoliq. INAIL", importoStd: 80 },
  ],
  clienti: [
    { id: 1, ragsoc: "Rossi Mario SRL", referente: "Mario Rossi", email: "mario@rossi.it", telefono: "333 1234567", piva: "IT11111111111", cf: "RSSMRA80A01F205X", indirizzo: "Via Verdi 10", cap: "20100", citta: "Milano", prov: "MI", tipoContabilita: "Ordinaria", iva: 0.22, rit: 0.20, cassa: 0.04, stato: "attivo", note: "Cliente storico dal 2018" },
    { id: 2, ragsoc: "Bianchi Luca", referente: "Luca Bianchi", email: "luca@bianchi.it", telefono: "339 7654321", piva: "IT22222222222", cf: "BNCLCU85B02F205Y", indirizzo: "Corso Italia 5", cap: "20121", citta: "Milano", prov: "MI", tipoContabilita: "Forfettaria", iva: 0, rit: 0, cassa: 0.04, stato: "attivo", note: "Regime forfettario" },
    { id: 3, ragsoc: "Verdi & Associati", referente: "Anna Verdi", email: "anna@verdi.it", telefono: "02 9876543", piva: "IT33333333333", cf: "VRDNNA75C03F205Z", indirizzo: "Piazza Duomo 1", cap: "20122", citta: "Milano", prov: "MI", tipoContabilita: "Ordinaria", iva: 0.22, rit: 0.20, cassa: 0.04, stato: "attivo", note: "" },
  ],
  contratti: [
    { id: 1, idCliente: 1, codContr: "2024-001", anno: 2024, descrizione: "Incarico 2024", stato: "attivo", importo: 3600, iva: 0.22, rit: 0.20, cassa: 0.04 },
    { id: 2, idCliente: 2, codContr: "2024-002", anno: 2024, descrizione: "Incarico 2024", stato: "attivo", importo: 1200, iva: 0, rit: 0, cassa: 0.04 },
    { id: 3, idCliente: 3, codContr: "2024-003", anno: 2024, descrizione: "Incarico 2024", stato: "attivo", importo: 4800, iva: 0.22, rit: 0.20, cassa: 0.04 },
  ],
  incassi: [
    { id: 1, idContratto: 1, data: "2024-01-15", importoInc: 320.51, importo: 300, stato: "fatturato", note: "RID gennaio", modalita: "RID" },
    { id: 2, idContratto: 1, data: "2024-02-15", importoInc: 320.51, importo: 300, stato: "fatturato", note: "RID febbraio", modalita: "RID" },
    { id: 3, idContratto: 1, data: "2024-03-15", importoInc: 320.51, importo: 300, stato: "da fatt", note: "RID marzo", modalita: "RID" },
    { id: 4, idContratto: 2, data: "2024-01-20", importoInc: 104, importo: 100, stato: "fatturato", note: "Bonifico", modalita: "Bonifico" },
    { id: 5, idContratto: 2, data: "2024-02-20", importoInc: 104, importo: 100, stato: "fatturato", note: "Bonifico", modalita: "Bonifico" },
    { id: 6, idContratto: 3, data: "2024-01-10", importoInc: 427.35, importo: 400, stato: "fatturato", note: "RID", modalita: "RID" },
    { id: 7, idContratto: 3, data: "2024-02-10", importoInc: 427.35, importo: 400, stato: "fatturato", note: "RID", modalita: "RID" },
    { id: 8, idContratto: 3, data: "2024-03-10", importoInc: 427.35, importo: 400, stato: "da fatt", note: "RID", modalita: "RID" },
  ],
  costiStudio: [
    { id: 1, idCdc: 1, costo: 150, note: "Licenza software", data: "2024-01-15", stato: "pagato" },
    { id: 2, idCdc: 2, costo: 80, note: "Telefono gennaio", data: "2024-01-31", stato: "pagato" },
    { id: 3, idCdc: 6, costo: 200, note: "Hosting annuale", data: "2024-01-05", stato: "pagato" },
    { id: 4, idCdc: 4, costo: 2500, note: "Stipendio collaboratore", data: "2024-01-28", stato: "pagato" },
    { id: 5, idCdc: 1, costo: 150, note: "Licenza software", data: "2024-02-15", stato: "pagato" },
    { id: 6, idCdc: 2, costo: 85, note: "Telefono febbraio", data: "2024-02-28", stato: "pagato" },
  ],
  costiAltri: [
    { id: 1, idContratto: 1, descrizione: "Rinnovo PEC", importo: 25, addebitoCliente: true, data: "2024-02-10" },
    { id: 2, idContratto: 3, descrizione: "Visura CCIAA", importo: 15, addebitoCliente: true, data: "2024-01-20" },
  ]
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

const calcCoeff = (iva, rit, cassa) => (1 + cassa) * (1 + iva) - rit;
const lordoToImponibile = (lordo, coeff) => lordo / coeff;
const imponibileToLordo = (imponibile, coeff) => imponibile * coeff;

const formatCurrency = (amount) => new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(amount);
const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('it-IT');

// ============================================
// COMPONENTS
// ============================================

// Sidebar Navigation
const Sidebar = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'clienti', label: 'Clienti', icon: '👥' },
    { id: 'contratti', label: 'Contratti', icon: '📋' },
    { id: 'incassi', label: 'Incassi', icon: '💰' },
    { id: 'fatture', label: 'Fatturazione', icon: '🧾' },
    { id: 'costi', label: 'Costi Studio', icon: '📉' },
    { id: 'report', label: 'Report', icon: '📈' },
    { id: 'impostazioni', label: 'Impostazioni', icon: '⚙️' },
  ];

  return (
    <div style={{
      width: '240px',
      background: 'linear-gradient(180deg, #1a202c 0%, #2d3748 100%)',
      color: 'white',
      padding: '20px 0',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '4px 0 20px rgba(0,0,0,0.3)'
    }}>
      <div style={{ padding: '0 20px 30px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <h1 style={{ fontSize: '1.4rem', fontWeight: '700', margin: 0, letterSpacing: '-0.5px' }}>📒 Gestionale</h1>
        <p style={{ fontSize: '0.75rem', opacity: 0.6, margin: '5px 0 0' }}>Studio Professionale</p>
      </div>
      <nav style={{ flex: 1, padding: '20px 0' }}>
        {menuItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            style={{
              width: '100%',
              padding: '12px 20px',
              border: 'none',
              background: activeSection === item.id ? 'rgba(66, 153, 225, 0.3)' : 'transparent',
              color: 'white',
              textAlign: 'left',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '0.9rem',
              transition: 'all 0.2s',
              borderLeft: activeSection === item.id ? '3px solid #4299e1' : '3px solid transparent'
            }}
          >
            <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

// Card Component
const Card = ({ title, children, action, style = {} }) => (
  <div style={{
    background: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
    ...style
  }}>
    {(title || action) && (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        {title && <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: '600', color: '#2d3748' }}>{title}</h3>}
        {action}
      </div>
    )}
    {children}
  </div>
);

// Stat Card
const StatCard = ({ label, value, icon, color = '#4299e1', trend }) => (
  <div style={{
    background: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  }}>
    <div style={{
      width: '50px',
      height: '50px',
      borderRadius: '10px',
      background: `${color}20`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.5rem'
    }}>
      {icon}
    </div>
    <div>
      <p style={{ margin: 0, fontSize: '0.8rem', color: '#718096' }}>{label}</p>
      <p style={{ margin: '5px 0 0', fontSize: '1.4rem', fontWeight: '700', color: '#2d3748' }}>{value}</p>
      {trend && <p style={{ margin: '3px 0 0', fontSize: '0.75rem', color: trend > 0 ? '#48bb78' : '#f56565' }}>{trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%</p>}
    </div>
  </div>
);

// Button Component
const Button = ({ children, onClick, variant = 'primary', size = 'md', style = {} }) => {
  const variants = {
    primary: { bg: '#4299e1', color: 'white' },
    success: { bg: '#48bb78', color: 'white' },
    danger: { bg: '#f56565', color: 'white' },
    secondary: { bg: '#e2e8f0', color: '#4a5568' }
  };
  const sizes = { sm: '8px 12px', md: '10px 16px', lg: '12px 24px' };
  
  return (
    <button onClick={onClick} style={{
      padding: sizes[size],
      background: variants[variant].bg,
      color: variants[variant].color,
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontWeight: '500',
      fontSize: size === 'sm' ? '0.8rem' : '0.9rem',
      transition: 'all 0.2s',
      ...style
    }}>
      {children}
    </button>
  );
};

// Input Component
const Input = ({ label, value, onChange, type = 'text', placeholder, style = {} }) => (
  <div style={{ marginBottom: '15px', ...style }}>
    {label && <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', fontWeight: '500', color: '#4a5568' }}>{label}</label>}
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: '100%',
        padding: '10px 12px',
        border: '1px solid #e2e8f0',
        borderRadius: '6px',
        fontSize: '0.9rem',
        boxSizing: 'border-box',
        transition: 'border-color 0.2s'
      }}
    />
  </div>
);

// Select Component
const Select = ({ label, value, onChange, options, style = {} }) => (
  <div style={{ marginBottom: '15px', ...style }}>
    {label && <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', fontWeight: '500', color: '#4a5568' }}>{label}</label>}
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{
        width: '100%',
        padding: '10px 12px',
        border: '1px solid #e2e8f0',
        borderRadius: '6px',
        fontSize: '0.9rem',
        boxSizing: 'border-box',
        background: 'white'
      }}
    >
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);

// Badge Component
const Badge = ({ children, color = 'blue' }) => {
  const colors = {
    blue: { bg: '#ebf8ff', text: '#2b6cb0' },
    green: { bg: '#f0fff4', text: '#276749' },
    yellow: { bg: '#fffff0', text: '#975a16' },
    red: { bg: '#fff5f5', text: '#c53030' },
    gray: { bg: '#f7fafc', text: '#4a5568' }
  };
  return (
    <span style={{
      padding: '4px 10px',
      borderRadius: '20px',
      fontSize: '0.75rem',
      fontWeight: '600',
      background: colors[color].bg,
      color: colors[color].text
    }}>
      {children}
    </span>
  );
};

// Table Component
const Table = ({ columns, data, onRowClick }) => (
  <div style={{ overflowX: 'auto' }}>
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
          {columns.map(col => (
            <th key={col.key} style={{ padding: '12px', textAlign: 'left', fontSize: '0.8rem', fontWeight: '600', color: '#718096', textTransform: 'uppercase' }}>
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr 
            key={idx} 
            onClick={() => onRowClick && onRowClick(row)}
            style={{ 
              borderBottom: '1px solid #f0f0f0', 
              cursor: onRowClick ? 'pointer' : 'default',
              transition: 'background 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#f7fafc'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            {columns.map(col => (
              <td key={col.key} style={{ padding: '12px', fontSize: '0.9rem', color: '#4a5568' }}>
                {col.render ? col.render(row[col.key], row) : row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Modal Component
const Modal = ({ isOpen, onClose, title, children, width = '500px' }) => {
  if (!isOpen) return null;
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }} onClick={onClose}>
      <div style={{
        background: 'white',
        borderRadius: '12px',
        width,
        maxWidth: '90vw',
        maxHeight: '90vh',
        overflow: 'auto',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }} onClick={e => e.stopPropagation()}>
        <div style={{ padding: '20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '600' }}>{title}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#a0aec0' }}>×</button>
        </div>
        <div style={{ padding: '20px' }}>{children}</div>
      </div>
    </div>
  );
};

// ============================================
// MAIN SECTIONS
// ============================================

// Dashboard Section
const DashboardSection = ({ data }) => {
  const totIncassi = data.incassi.reduce((sum, i) => sum + i.importo, 0);
  const totDaFatturare = data.incassi.filter(i => i.stato === 'da fatt').reduce((sum, i) => sum + i.importo, 0);
  const totCosti = data.costiStudio.reduce((sum, c) => sum + c.costo, 0);
  const clientiAttivi = data.clienti.filter(c => c.stato === 'attivo').length;
  
  const incassiPerMese = data.incassi.reduce((acc, inc) => {
    const mese = new Date(inc.data).toLocaleString('it-IT', { month: 'short' });
    acc[mese] = (acc[mese] || 0) + inc.importo;
    return acc;
  }, {});
  
  const chartData = Object.entries(incassiPerMese).map(([mese, totale]) => ({ mese, totale }));
  
  const costiPerCategoria = data.costiStudio.reduce((acc, c) => {
    const cat = data.centriDiCosto.find(cdc => cdc.id === c.idCdc)?.nome || 'Altro';
    acc[cat] = (acc[cat] || 0) + c.costo;
    return acc;
  }, {});
  
  const pieData = Object.entries(costiPerCategoria).map(([name, value]) => ({ name, value }));
  const COLORS = ['#4299e1', '#48bb78', '#ed8936', '#9f7aea', '#f56565', '#38b2ac', '#ed64a6'];

  return (
    <div>
      <h2 style={{ margin: '0 0 20px', fontSize: '1.5rem', fontWeight: '700', color: '#2d3748' }}>Dashboard</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
        <StatCard label="Totale Incassi" value={formatCurrency(totIncassi)} icon="💰" color="#48bb78" trend={12} />
        <StatCard label="Da Fatturare" value={formatCurrency(totDaFatturare)} icon="🧾" color="#ed8936" />
        <StatCard label="Costi Studio" value={formatCurrency(totCosti)} icon="📉" color="#f56565" trend={-5} />
        <StatCard label="Clienti Attivi" value={clientiAttivi} icon="👥" color="#4299e1" />
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        <Card title="Andamento Incassi">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <XAxis dataKey="mese" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Bar dataKey="totale" fill="#4299e1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        
        <Card title="Ripartizione Costi">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                {pieData.map((_, idx) => <Cell key={idx} fill={COLORS[idx % COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value)} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
        <Card title="Ultimi Incassi">
          <Table
            columns={[
              { key: 'data', label: 'Data', render: (v) => formatDate(v) },
              { key: 'cliente', label: 'Cliente' },
              { key: 'importo', label: 'Importo', render: (v) => formatCurrency(v) },
              { key: 'stato', label: 'Stato', render: (v) => <Badge color={v === 'fatturato' ? 'green' : 'yellow'}>{v}</Badge> }
            ]}
            data={data.incassi.slice(-5).reverse().map(i => ({
              ...i,
              cliente: data.clienti.find(c => data.contratti.find(ct => ct.id === i.idContratto)?.idCliente === c.id)?.ragsoc || '-'
            }))}
          />
        </Card>
        
        <Card title="Contratti in Scadenza">
          <Table
            columns={[
              { key: 'codContr', label: 'Codice' },
              { key: 'cliente', label: 'Cliente' },
              { key: 'importo', label: 'Importo', render: (v) => formatCurrency(v) },
              { key: 'stato', label: 'Stato', render: (v) => <Badge color={v === 'attivo' ? 'green' : 'gray'}>{v}</Badge> }
            ]}
            data={data.contratti.slice(-5).map(c => ({
              ...c,
              cliente: data.clienti.find(cl => cl.id === c.idCliente)?.ragsoc || '-'
            }))}
          />
        </Card>
      </div>
    </div>
  );
};

// Clienti Section
const ClientiSection = ({ data, setData }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCliente, setEditingCliente] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [form, setForm] = useState({
    ragsoc: '', referente: '', email: '', telefono: '', piva: '', cf: '',
    indirizzo: '', cap: '', citta: '', prov: '', tipoContabilita: 'Ordinaria',
    iva: 0.22, rit: 0.20, cassa: 0.04, stato: 'attivo', note: ''
  });
  
  const openNew = () => {
    setEditingCliente(null);
    setForm({ ragsoc: '', referente: '', email: '', telefono: '', piva: '', cf: '', indirizzo: '', cap: '', citta: '', prov: '', tipoContabilita: 'Ordinaria', iva: 0.22, rit: 0.20, cassa: 0.04, stato: 'attivo', note: '' });
    setModalOpen(true);
  };
  
  const openEdit = (cliente) => {
    setEditingCliente(cliente);
    setForm({ ...cliente });
    setModalOpen(true);
  };
  
  const handleSave = () => {
    if (editingCliente) {
      setData(prev => ({
        ...prev,
        clienti: prev.clienti.map(c => c.id === editingCliente.id ? { ...c, ...form } : c)
      }));
    } else {
      const newId = Math.max(...data.clienti.map(c => c.id)) + 1;
      setData(prev => ({
        ...prev,
        clienti: [...prev.clienti, { ...form, id: newId }]
      }));
    }
    setModalOpen(false);
  };
  
  const handleTipoChange = (tipo) => {
    if (tipo === 'Forfettaria') {
      setForm({ ...form, tipoContabilita: tipo, iva: 0, rit: 0 });
    } else {
      setForm({ ...form, tipoContabilita: tipo, iva: 0.22, rit: 0.20 });
    }
  };
  
  const filteredClienti = data.clienti.filter(c => 
    c.ragsoc.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.referente.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700', color: '#2d3748' }}>Clienti</h2>
        <Button onClick={openNew}>+ Nuovo Cliente</Button>
      </div>
      
      <Card>
        <Input placeholder="Cerca cliente..." value={searchTerm} onChange={setSearchTerm} style={{ marginBottom: '20px', maxWidth: '300px' }} />
        <Table
          columns={[
            { key: 'ragsoc', label: 'Ragione Sociale' },
            { key: 'referente', label: 'Referente' },
            { key: 'telefono', label: 'Telefono' },
            { key: 'tipoContabilita', label: 'Tipo', render: (v) => <Badge color={v === 'Ordinaria' ? 'blue' : 'green'}>{v}</Badge> },
            { key: 'stato', label: 'Stato', render: (v) => <Badge color={v === 'attivo' ? 'green' : 'gray'}>{v}</Badge> },
            { key: 'actions', label: '', render: (_, row) => <Button size="sm" variant="secondary" onClick={(e) => { e.stopPropagation(); openEdit(row); }}>Modifica</Button> }
          ]}
          data={filteredClienti}
          onRowClick={openEdit}
        />
      </Card>
      
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingCliente ? 'Modifica Cliente' : 'Nuovo Cliente'} width="700px">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <Input label="Ragione Sociale *" value={form.ragsoc} onChange={v => setForm({ ...form, ragsoc: v })} />
          <Input label="Referente" value={form.referente} onChange={v => setForm({ ...form, referente: v })} />
          <Input label="Email" type="email" value={form.email} onChange={v => setForm({ ...form, email: v })} />
          <Input label="Telefono" value={form.telefono} onChange={v => setForm({ ...form, telefono: v })} />
          <Input label="P.IVA" value={form.piva} onChange={v => setForm({ ...form, piva: v })} />
          <Input label="Codice Fiscale" value={form.cf} onChange={v => setForm({ ...form, cf: v })} />
          <Input label="Indirizzo" value={form.indirizzo} onChange={v => setForm({ ...form, indirizzo: v })} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '10px' }}>
            <Input label="CAP" value={form.cap} onChange={v => setForm({ ...form, cap: v })} />
            <Input label="Città" value={form.citta} onChange={v => setForm({ ...form, citta: v })} />
            <Input label="Prov" value={form.prov} onChange={v => setForm({ ...form, prov: v })} />
          </div>
          <Select label="Tipo Contabilità" value={form.tipoContabilita} onChange={handleTipoChange} options={[{ value: 'Ordinaria', label: 'Ordinaria' }, { value: 'Forfettaria', label: 'Forfettaria' }]} />
          <Select label="Stato" value={form.stato} onChange={v => setForm({ ...form, stato: v })} options={[{ value: 'attivo', label: 'Attivo' }, { value: 'inattivo', label: 'Inattivo' }]} />
        </div>
        
        <div style={{ background: '#f7fafc', padding: '15px', borderRadius: '8px', marginTop: '15px' }}>
          <h4 style={{ margin: '0 0 10px', fontSize: '0.9rem', color: '#4a5568' }}>Aliquote Fiscali</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
            <Input label="IVA %" type="number" value={form.iva * 100} onChange={v => setForm({ ...form, iva: v / 100 })} />
            <Input label="Ritenuta %" type="number" value={form.rit * 100} onChange={v => setForm({ ...form, rit: v / 100 })} />
            <Input label="Cassa %" type="number" value={form.cassa * 100} onChange={v => setForm({ ...form, cassa: v / 100 })} />
          </div>
          <p style={{ margin: '10px 0 0', fontSize: '0.8rem', color: '#718096' }}>
            Coefficiente: <strong>{calcCoeff(form.iva, form.rit, form.cassa).toFixed(4)}</strong>
          </p>
        </div>
        
        <div style={{ marginTop: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', fontWeight: '500', color: '#4a5568' }}>Note</label>
          <textarea value={form.note} onChange={e => setForm({ ...form, note: e.target.value })} rows={3} style={{ width: '100%', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '6px', resize: 'vertical', boxSizing: 'border-box' }} />
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
          <Button variant="secondary" onClick={() => setModalOpen(false)}>Annulla</Button>
          <Button onClick={handleSave}>Salva</Button>
        </div>
      </Modal>
    </div>
  );
};

// Contratti Section
const ContrattiSection = ({ data, setData }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ idCliente: '', anno: new Date().getFullYear(), descrizione: '', importo: 0 });
  
  const openNew = () => {
    setForm({ idCliente: data.clienti[0]?.id || '', anno: new Date().getFullYear(), descrizione: `Incarico ${new Date().getFullYear()}`, importo: 0 });
    setModalOpen(true);
  };
  
  const handleSave = () => {
    const cliente = data.clienti.find(c => c.id === parseInt(form.idCliente));
    const newId = Math.max(...data.contratti.map(c => c.id), 0) + 1;
    const codContr = `${form.anno}-${String(newId).padStart(3, '0')}`;
    
    setData(prev => ({
      ...prev,
      contratti: [...prev.contratti, {
        id: newId,
        idCliente: parseInt(form.idCliente),
        codContr,
        anno: form.anno,
        descrizione: form.descrizione,
        stato: 'attivo',
        importo: parseFloat(form.importo),
        iva: cliente?.iva || 0.22,
        rit: cliente?.rit || 0.20,
        cassa: cliente?.cassa || 0.04
      }]
    }));
    setModalOpen(false);
  };
  
  const getIncassiContratto = (contrattoId) => {
    return data.incassi.filter(i => i.idContratto === contrattoId).reduce((sum, i) => sum + i.importo, 0);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700', color: '#2d3748' }}>Contratti / Incarichi</h2>
        <Button onClick={openNew}>+ Nuovo Contratto</Button>
      </div>
      
      <Card>
        <Table
          columns={[
            { key: 'codContr', label: 'Codice' },
            { key: 'cliente', label: 'Cliente' },
            { key: 'anno', label: 'Anno' },
            { key: 'descrizione', label: 'Descrizione' },
            { key: 'importo', label: 'Importo Previsto', render: (v) => formatCurrency(v) },
            { key: 'incassato', label: 'Incassato', render: (v) => formatCurrency(v) },
            { key: 'stato', label: 'Stato', render: (v) => <Badge color={v === 'attivo' ? 'green' : 'gray'}>{v}</Badge> }
          ]}
          data={data.contratti.map(c => ({
            ...c,
            cliente: data.clienti.find(cl => cl.id === c.idCliente)?.ragsoc || '-',
            incassato: getIncassiContratto(c.id)
          }))}
        />
      </Card>
      
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Nuovo Contratto">
        <Select label="Cliente *" value={form.idCliente} onChange={v => setForm({ ...form, idCliente: v })} options={data.clienti.filter(c => c.stato === 'attivo').map(c => ({ value: c.id, label: c.ragsoc }))} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <Input label="Anno" type="number" value={form.anno} onChange={v => setForm({ ...form, anno: parseInt(v) })} />
          <Input label="Importo Previsto" type="number" value={form.importo} onChange={v => setForm({ ...form, importo: v })} />
        </div>
        <Input label="Descrizione" value={form.descrizione} onChange={v => setForm({ ...form, descrizione: v })} />
        
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
          <Button variant="secondary" onClick={() => setModalOpen(false)}>Annulla</Button>
          <Button onClick={handleSave}>Salva</Button>
        </div>
      </Modal>
    </div>
  );
};

// Incassi Section
const IncassiSection = ({ data, setData }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ idContratto: '', data: '', importoInc: 0, stato: 'da fatt', note: '', modalita: 'Bonifico' });
  const [calcoloPreview, setCalcoloPreview] = useState(null);
  
  const openNew = () => {
    setForm({ idContratto: data.contratti[0]?.id || '', data: new Date().toISOString().split('T')[0], importoInc: 0, stato: 'da fatt', note: '', modalita: 'Bonifico' });
    setCalcoloPreview(null);
    setModalOpen(true);
  };
  
  const handleContrattoChange = (idContratto) => {
    setForm({ ...form, idContratto });
    updateCalcolo(form.importoInc, idContratto);
  };
  
  const handleImportoChange = (importoInc) => {
    setForm({ ...form, importoInc: parseFloat(importoInc) || 0 });
    updateCalcolo(parseFloat(importoInc) || 0, form.idContratto);
  };
  
  const updateCalcolo = (importoInc, idContratto) => {
    const contratto = data.contratti.find(c => c.id === parseInt(idContratto));
    if (contratto && importoInc > 0) {
      const coeff = calcCoeff(contratto.iva, contratto.rit, contratto.cassa);
      const imponibile = lordoToImponibile(importoInc, coeff);
      setCalcoloPreview({
        coeff,
        imponibile,
        iva: contratto.iva,
        rit: contratto.rit,
        cassa: contratto.cassa
      });
    } else {
      setCalcoloPreview(null);
    }
  };
  
  const handleSave = () => {
    const contratto = data.contratti.find(c => c.id === parseInt(form.idContratto));
    const coeff = calcCoeff(contratto.iva, contratto.rit, contratto.cassa);
    const imponibile = lordoToImponibile(form.importoInc, coeff);
    
    const newId = Math.max(...data.incassi.map(i => i.id), 0) + 1;
    setData(prev => ({
      ...prev,
      incassi: [...prev.incassi, {
        id: newId,
        idContratto: parseInt(form.idContratto),
        data: form.data,
        importoInc: form.importoInc,
        importo: Math.round(imponibile * 100) / 100,
        stato: form.stato,
        note: form.note,
        modalita: form.modalita
      }]
    }));
    setModalOpen(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700', color: '#2d3748' }}>Incassi</h2>
        <Button onClick={openNew}>+ Nuovo Incasso</Button>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '20px' }}>
        <StatCard label="Totale Incassato" value={formatCurrency(data.incassi.reduce((s, i) => s + i.importoInc, 0))} icon="💵" color="#48bb78" />
        <StatCard label="Imponibile Totale" value={formatCurrency(data.incassi.reduce((s, i) => s + i.importo, 0))} icon="📊" color="#4299e1" />
        <StatCard label="Da Fatturare" value={formatCurrency(data.incassi.filter(i => i.stato === 'da fatt').reduce((s, i) => s + i.importo, 0))} icon="🧾" color="#ed8936" />
      </div>
      
      <Card>
        <Table
          columns={[
            { key: 'data', label: 'Data', render: (v) => formatDate(v) },
            { key: 'cliente', label: 'Cliente' },
            { key: 'importoInc', label: 'Lordo', render: (v) => formatCurrency(v) },
            { key: 'importo', label: 'Imponibile', render: (v) => formatCurrency(v) },
            { key: 'modalita', label: 'Modalità' },
            { key: 'stato', label: 'Stato', render: (v) => <Badge color={v === 'fatturato' ? 'green' : v === 'da fatt' ? 'yellow' : 'gray'}>{v}</Badge> },
            { key: 'note', label: 'Note' }
          ]}
          data={data.incassi.map(i => ({
            ...i,
            cliente: data.clienti.find(c => data.contratti.find(ct => ct.id === i.idContratto)?.idCliente === c.id)?.ragsoc || '-'
          })).sort((a, b) => new Date(b.data) - new Date(a.data))}
        />
      </Card>
      
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Nuovo Incasso" width="600px">
        <Select 
          label="Contratto *" 
          value={form.idContratto} 
          onChange={handleContrattoChange} 
          options={data.contratti.filter(c => c.stato === 'attivo').map(c => ({ 
            value: c.id, 
            label: `${c.codContr} - ${data.clienti.find(cl => cl.id === c.idCliente)?.ragsoc}` 
          }))} 
        />
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <Input label="Data" type="date" value={form.data} onChange={v => setForm({ ...form, data: v })} />
          <Input label="Importo Lordo Incassato (€)" type="number" value={form.importoInc} onChange={handleImportoChange} />
        </div>
        
        {calcoloPreview && (
          <div style={{ background: '#f0fff4', padding: '15px', borderRadius: '8px', marginTop: '15px', border: '1px solid #c6f6d5' }}>
            <h4 style={{ margin: '0 0 10px', fontSize: '0.9rem', color: '#276749' }}>📊 Calcolo Automatico</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.85rem' }}>
              <div>Coefficiente: <strong>{calcoloPreview.coeff.toFixed(4)}</strong></div>
              <div>IVA: {(calcoloPreview.iva * 100).toFixed(0)}% | Rit: {(calcoloPreview.rit * 100).toFixed(0)}% | Cassa: {(calcoloPreview.cassa * 100).toFixed(0)}%</div>
            </div>
            <div style={{ marginTop: '10px', padding: '10px', background: 'white', borderRadius: '4px' }}>
              <strong style={{ color: '#276749' }}>Imponibile calcolato: {formatCurrency(calcoloPreview.imponibile)}</strong>
            </div>
          </div>
        )}
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
          <Select label="Modalità" value={form.modalita} onChange={v => setForm({ ...form, modalita: v })} options={[
            { value: 'RID', label: 'RID' },
            { value: 'Bonifico', label: 'Bonifico' },
            { value: 'Contanti', label: 'Contanti' },
            { value: 'Assegno', label: 'Assegno' }
          ]} />
          <Select label="Stato Fatturazione" value={form.stato} onChange={v => setForm({ ...form, stato: v })} options={[
            { value: 'fatturato', label: 'Fatturato' },
            { value: 'da fatt', label: 'Da Fatturare' },
            { value: 'no fatt', label: 'Non Fatturare' }
          ]} />
        </div>
        
        <Input label="Note" value={form.note} onChange={v => setForm({ ...form, note: v })} />
        
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
          <Button variant="secondary" onClick={() => setModalOpen(false)}>Annulla</Button>
          <Button onClick={handleSave} disabled={!calcoloPreview}>Registra Incasso</Button>
        </div>
      </Modal>
    </div>
  );
};

// Fatturazione Section
const FatturazioneSection = ({ data, setData }) => {
  const [selectedIncassi, setSelectedIncassi] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  
  const incassiDaFatturare = data.incassi.filter(i => i.stato === 'da fatt').map(i => ({
    ...i,
    contratto: data.contratti.find(c => c.id === i.idContratto),
    cliente: data.clienti.find(c => data.contratti.find(ct => ct.id === i.idContratto)?.idCliente === c.id)
  }));
  
  const toggleIncasso = (id) => {
    setSelectedIncassi(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };
  
  const selectAll = () => {
    if (selectedIncassi.length === incassiDaFatturare.length) {
      setSelectedIncassi([]);
    } else {
      setSelectedIncassi(incassiDaFatturare.map(i => i.id));
    }
  };
  
  const generaFattura = () => {
    setData(prev => ({
      ...prev,
      incassi: prev.incassi.map(i => selectedIncassi.includes(i.id) ? { ...i, stato: 'fatturato' } : i)
    }));
    setSelectedIncassi([]);
    setPreviewOpen(false);
  };
  
  const selectedItems = incassiDaFatturare.filter(i => selectedIncassi.includes(i.id));
  const totaleImponibile = selectedItems.reduce((s, i) => s + i.importo, 0);
  
  // Calcola dettagli fattura per il primo cliente selezionato
  const primoCliente = selectedItems[0]?.cliente;
  let dettaglioFattura = null;
  if (primoCliente && totaleImponibile > 0) {
    const cassa = totaleImponibile * primoCliente.cassa;
    const subtotale = totaleImponibile + cassa;
    const iva = subtotale * primoCliente.iva;
    const totale = subtotale + iva;
    const ritenuta = totaleImponibile * primoCliente.rit;
    const netto = totale - ritenuta;
    dettaglioFattura = { cassa, subtotale, iva, totale, ritenuta, netto };
  }

  return (
    <div>
      <h2 style={{ margin: '0 0 20px', fontSize: '1.5rem', fontWeight: '700', color: '#2d3748' }}>Fatturazione</h2>
      
      {incassiDaFatturare.length === 0 ? (
        <Card>
          <div style={{ textAlign: 'center', padding: '40px', color: '#718096' }}>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>✅</div>
            <p>Nessun incasso da fatturare</p>
          </div>
        </Card>
      ) : (
        <>
          <Card 
            title={`Incassi da Fatturare (${incassiDaFatturare.length})`}
            action={
              <div style={{ display: 'flex', gap: '10px' }}>
                <Button variant="secondary" onClick={selectAll}>{selectedIncassi.length === incassiDaFatturare.length ? 'Deseleziona' : 'Seleziona'} Tutti</Button>
                <Button onClick={() => setPreviewOpen(true)} disabled={selectedIncassi.length === 0}>Genera Fattura ({selectedIncassi.length})</Button>
              </div>
            }
          >
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                  <th style={{ width: '40px', padding: '12px' }}></th>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '0.8rem', fontWeight: '600', color: '#718096' }}>DATA</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '0.8rem', fontWeight: '600', color: '#718096' }}>CLIENTE</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontSize: '0.8rem', fontWeight: '600', color: '#718096' }}>CONTRATTO</th>
                  <th style={{ padding: '12px', textAlign: 'right', fontSize: '0.8rem', fontWeight: '600', color: '#718096' }}>LORDO</th>
                  <th style={{ padding: '12px', textAlign: 'right', fontSize: '0.8rem', fontWeight: '600', color: '#718096' }}>IMPONIBILE</th>
                </tr>
              </thead>
              <tbody>
                {incassiDaFatturare.map(i => (
                  <tr key={i.id} style={{ borderBottom: '1px solid #f0f0f0', background: selectedIncassi.includes(i.id) ? '#ebf8ff' : 'transparent' }}>
                    <td style={{ padding: '12px' }}>
                      <input type="checkbox" checked={selectedIncassi.includes(i.id)} onChange={() => toggleIncasso(i.id)} style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
                    </td>
                    <td style={{ padding: '12px', fontSize: '0.9rem' }}>{formatDate(i.data)}</td>
                    <td style={{ padding: '12px', fontSize: '0.9rem' }}>{i.cliente?.ragsoc}</td>
                    <td style={{ padding: '12px', fontSize: '0.9rem' }}>{i.contratto?.codContr}</td>
                    <td style={{ padding: '12px', fontSize: '0.9rem', textAlign: 'right' }}>{formatCurrency(i.importoInc)}</td>
                    <td style={{ padding: '12px', fontSize: '0.9rem', textAlign: 'right', fontWeight: '600' }}>{formatCurrency(i.importo)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
          
          <Modal isOpen={previewOpen} onClose={() => setPreviewOpen(false)} title="Anteprima Fattura" width="700px">
            {primoCliente && dettaglioFattura && (
              <div>
                <div style={{ background: '#f7fafc', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
                  <h4 style={{ margin: '0 0 10px', fontSize: '0.9rem' }}>Cliente</h4>
                  <p style={{ margin: 0, fontWeight: '600' }}>{primoCliente.ragsoc}</p>
                  <p style={{ margin: '5px 0 0', fontSize: '0.85rem', color: '#718096' }}>{primoCliente.indirizzo}, {primoCliente.cap} {primoCliente.citta}</p>
                  <p style={{ margin: '5px 0 0', fontSize: '0.85rem', color: '#718096' }}>P.IVA: {primoCliente.piva}</p>
                </div>
                
                <h4 style={{ margin: '0 0 10px' }}>Dettaglio Voci</h4>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
                  <thead>
                    <tr style={{ background: '#f7fafc' }}>
                      <th style={{ padding: '10px', textAlign: 'left', fontSize: '0.8rem' }}>Descrizione</th>
                      <th style={{ padding: '10px', textAlign: 'right', fontSize: '0.8rem' }}>Importo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedItems.map(i => (
                      <tr key={i.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '10px', fontSize: '0.9rem' }}>{i.note || `Prestazione del ${formatDate(i.data)}`}</td>
                        <td style={{ padding: '10px', fontSize: '0.9rem', textAlign: 'right' }}>{formatCurrency(i.importo)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                <div style={{ background: '#f0fff4', padding: '15px', borderRadius: '8px', border: '1px solid #c6f6d5' }}>
                  <h4 style={{ margin: '0 0 15px', color: '#276749' }}>Riepilogo Fattura</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '8px', fontSize: '0.9rem' }}>
                    <span>Imponibile:</span><span style={{ textAlign: 'right' }}>{formatCurrency(totaleImponibile)}</span>
                    <span>Cassa {(primoCliente.cassa * 100).toFixed(0)}%:</span><span style={{ textAlign: 'right' }}>{formatCurrency(dettaglioFattura.cassa)}</span>
                    <span>Subtotale:</span><span style={{ textAlign: 'right' }}>{formatCurrency(dettaglioFattura.subtotale)}</span>
                    <span>IVA {(primoCliente.iva * 100).toFixed(0)}%:</span><span style={{ textAlign: 'right' }}>{formatCurrency(dettaglioFattura.iva)}</span>
                    <span style={{ fontWeight: '600' }}>Totale Fattura:</span><span style={{ textAlign: 'right', fontWeight: '600' }}>{formatCurrency(dettaglioFattura.totale)}</span>
                    <span>Ritenuta {(primoCliente.rit * 100).toFixed(0)}%:</span><span style={{ textAlign: 'right', color: '#c53030' }}>-{formatCurrency(dettaglioFattura.ritenuta)}</span>
                    <span style={{ fontWeight: '700', fontSize: '1.1rem', color: '#276749' }}>Netto da Incassare:</span>
                    <span style={{ textAlign: 'right', fontWeight: '700', fontSize: '1.1rem', color: '#276749' }}>{formatCurrency(dettaglioFattura.netto)}</span>
                  </div>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                  <Button variant="secondary" onClick={() => setPreviewOpen(false)}>Annulla</Button>
                  <Button variant="success" onClick={generaFattura}>✓ Conferma e Genera</Button>
                </div>
              </div>
            )}
          </Modal>
        </>
      )}
    </div>
  );
};

// Costi Studio Section
const CostiSection = ({ data, setData }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ idCdc: '', costo: 0, note: '', data: '', stato: 'pagato' });
  
  const openNew = () => {
    setForm({ idCdc: data.centriDiCosto[0]?.id || '', costo: 0, note: '', data: new Date().toISOString().split('T')[0], stato: 'pagato' });
    setModalOpen(true);
  };
  
  const handleSave = () => {
    const newId = Math.max(...data.costiStudio.map(c => c.id), 0) + 1;
    setData(prev => ({
      ...prev,
      costiStudio: [...prev.costiStudio, {
        id: newId,
        idCdc: parseInt(form.idCdc),
        costo: parseFloat(form.costo),
        note: form.note,
        data: form.data,
        stato: form.stato
      }]
    }));
    setModalOpen(false);
  };
  
  const costiPerCategoria = data.costiStudio.reduce((acc, c) => {
    const cat = data.centriDiCosto.find(cdc => cdc.id === c.idCdc)?.nome || 'Altro';
    acc[cat] = (acc[cat] || 0) + c.costo;
    return acc;
  }, {});
  
  const pieData = Object.entries(costiPerCategoria).map(([name, value]) => ({ name, value }));
  const COLORS = ['#4299e1', '#48bb78', '#ed8936', '#9f7aea', '#f56565', '#38b2ac', '#ed64a6', '#667eea', '#f6ad55'];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700', color: '#2d3748' }}>Costi Studio</h2>
        <Button onClick={openNew}>+ Nuovo Costo</Button>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        <StatCard label="Totale Costi" value={formatCurrency(data.costiStudio.reduce((s, c) => s + c.costo, 0))} icon="📉" color="#f56565" />
        <Card title="Distribuzione per Categoria">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label={({ name }) => name}>
                {pieData.map((_, idx) => <Cell key={idx} fill={COLORS[idx % COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value)} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>
      
      <Card>
        <Table
          columns={[
            { key: 'data', label: 'Data', render: (v) => formatDate(v) },
            { key: 'categoria', label: 'Categoria' },
            { key: 'note', label: 'Descrizione' },
            { key: 'costo', label: 'Importo', render: (v) => formatCurrency(v) },
            { key: 'stato', label: 'Stato', render: (v) => <Badge color={v === 'pagato' ? 'green' : 'yellow'}>{v}</Badge> }
          ]}
          data={data.costiStudio.map(c => ({
            ...c,
            categoria: data.centriDiCosto.find(cdc => cdc.id === c.idCdc)?.nome || '-'
          })).sort((a, b) => new Date(b.data) - new Date(a.data))}
        />
      </Card>
      
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Nuovo Costo">
        <Select label="Centro di Costo *" value={form.idCdc} onChange={v => setForm({ ...form, idCdc: v })} options={data.centriDiCosto.map(c => ({ value: c.id, label: c.nome }))} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <Input label="Data" type="date" value={form.data} onChange={v => setForm({ ...form, data: v })} />
          <Input label="Importo (€)" type="number" value={form.costo} onChange={v => setForm({ ...form, costo: v })} />
        </div>
        <Input label="Descrizione" value={form.note} onChange={v => setForm({ ...form, note: v })} />
        <Select label="Stato" value={form.stato} onChange={v => setForm({ ...form, stato: v })} options={[{ value: 'pagato', label: 'Pagato' }, { value: 'da pagare', label: 'Da Pagare' }]} />
        
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
          <Button variant="secondary" onClick={() => setModalOpen(false)}>Annulla</Button>
          <Button onClick={handleSave}>Salva</Button>
        </div>
      </Modal>
    </div>
  );
};

// Report Section
const ReportSection = ({ data }) => {
  const totIncassi = data.incassi.reduce((s, i) => s + i.importo, 0);
  const totCosti = data.costiStudio.reduce((s, c) => s + c.costo, 0);
  const margine = totIncassi - totCosti;
  
  const incassiPerMese = data.incassi.reduce((acc, inc) => {
    const mese = new Date(inc.data).toLocaleString('it-IT', { month: 'short' });
    acc[mese] = (acc[mese] || 0) + inc.importo;
    return acc;
  }, {});
  
  const costiPerMese = data.costiStudio.reduce((acc, c) => {
    const mese = new Date(c.data).toLocaleString('it-IT', { month: 'short' });
    acc[mese] = (acc[mese] || 0) + c.costo;
    return acc;
  }, {});
  
  const mesi = [...new Set([...Object.keys(incassiPerMese), ...Object.keys(costiPerMese)])];
  const chartData = mesi.map(mese => ({
    mese,
    incassi: incassiPerMese[mese] || 0,
    costi: costiPerMese[mese] || 0,
    margine: (incassiPerMese[mese] || 0) - (costiPerMese[mese] || 0)
  }));
  
  const clientiStats = data.clienti.filter(c => c.stato === 'attivo').map(cliente => {
    const contratti = data.contratti.filter(ct => ct.idCliente === cliente.id);
    const incassi = contratti.flatMap(ct => data.incassi.filter(i => i.idContratto === ct.id));
    return {
      cliente: cliente.ragsoc,
      contratti: contratti.length,
      incassato: incassi.reduce((s, i) => s + i.importo, 0),
      fatturato: incassi.filter(i => i.stato === 'fatturato').reduce((s, i) => s + i.importo, 0),
      daFatturare: incassi.filter(i => i.stato === 'da fatt').reduce((s, i) => s + i.importo, 0)
    };
  }).sort((a, b) => b.incassato - a.incassato);

  return (
    <div>
      <h2 style={{ margin: '0 0 20px', fontSize: '1.5rem', fontWeight: '700', color: '#2d3748' }}>Report</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '30px' }}>
        <StatCard label="Totale Incassi" value={formatCurrency(totIncassi)} icon="💰" color="#48bb78" />
        <StatCard label="Totale Costi" value={formatCurrency(totCosti)} icon="📉" color="#f56565" />
        <StatCard label="Margine Operativo" value={formatCurrency(margine)} icon="📊" color={margine >= 0 ? '#48bb78' : '#f56565'} />
      </div>
      
      <Card title="Andamento Mensile" style={{ marginBottom: '20px' }}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis dataKey="mese" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip formatter={(value) => formatCurrency(value)} />
            <Line type="monotone" dataKey="incassi" stroke="#48bb78" strokeWidth={2} name="Incassi" />
            <Line type="monotone" dataKey="costi" stroke="#f56565" strokeWidth={2} name="Costi" />
            <Line type="monotone" dataKey="margine" stroke="#4299e1" strokeWidth={2} name="Margine" strokeDasharray="5 5" />
          </LineChart>
        </ResponsiveContainer>
      </Card>
      
      <Card title="Riepilogo per Cliente">
        <Table
          columns={[
            { key: 'cliente', label: 'Cliente' },
            { key: 'contratti', label: 'Contratti', render: (v) => <Badge color="blue">{v}</Badge> },
            { key: 'incassato', label: 'Incassato', render: (v) => formatCurrency(v) },
            { key: 'fatturato', label: 'Fatturato', render: (v) => formatCurrency(v) },
            { key: 'daFatturare', label: 'Da Fatturare', render: (v) => v > 0 ? <span style={{ color: '#ed8936', fontWeight: '600' }}>{formatCurrency(v)}</span> : formatCurrency(v) }
          ]}
          data={clientiStats}
        />
      </Card>
    </div>
  );
};

// Impostazioni Section
const ImpostazioniSection = ({ data, setData }) => {
  const [form, setForm] = useState(data.impostazioni);
  
  const handleSave = () => {
    setData(prev => ({ ...prev, impostazioni: form }));
    alert('Impostazioni salvate!');
  };

  return (
    <div>
      <h2 style={{ margin: '0 0 20px', fontSize: '1.5rem', fontWeight: '700', color: '#2d3748' }}>Impostazioni</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <Card title="Dati Studio">
          <Input label="Nome Studio" value={form.studio.nome} onChange={v => setForm({ ...form, studio: { ...form.studio, nome: v } })} />
          <Input label="Indirizzo" value={form.studio.indirizzo} onChange={v => setForm({ ...form, studio: { ...form.studio, indirizzo: v } })} />
          <Input label="Città" value={form.studio.citta} onChange={v => setForm({ ...form, studio: { ...form.studio, citta: v } })} />
          <Input label="P.IVA" value={form.studio.piva} onChange={v => setForm({ ...form, studio: { ...form.studio, piva: v } })} />
          <Input label="Email" value={form.studio.email} onChange={v => setForm({ ...form, studio: { ...form.studio, email: v } })} />
          <Input label="Telefono" value={form.studio.telefono} onChange={v => setForm({ ...form, studio: { ...form.studio, telefono: v } })} />
        </Card>
        
        <Card title="Aliquote Default">
          <div style={{ background: '#f7fafc', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
            <p style={{ margin: '0 0 10px', fontSize: '0.85rem', color: '#718096' }}>Queste aliquote vengono applicate ai nuovi clienti come default.</p>
          </div>
          <Input label="IVA %" type="number" value={form.iva * 100} onChange={v => setForm({ ...form, iva: parseFloat(v) / 100 })} />
          <Input label="Ritenuta d'Acconto %" type="number" value={form.ritenuta * 100} onChange={v => setForm({ ...form, ritenuta: parseFloat(v) / 100 })} />
          <Input label="Cassa Previdenza %" type="number" value={form.cassa * 100} onChange={v => setForm({ ...form, cassa: parseFloat(v) / 100 })} />
          
          <div style={{ background: '#ebf8ff', padding: '15px', borderRadius: '8px', marginTop: '15px' }}>
            <p style={{ margin: 0, fontSize: '0.85rem' }}>
              <strong>Coefficiente calcolato:</strong> {calcCoeff(form.iva, form.ritenuta, form.cassa).toFixed(4)}
            </p>
            <p style={{ margin: '5px 0 0', fontSize: '0.8rem', color: '#4a5568' }}>
              Formula: (1 + {(form.cassa * 100).toFixed(0)}%) × (1 + {(form.iva * 100).toFixed(0)}%) − {(form.ritenuta * 100).toFixed(0)}%
            </p>
          </div>
          
          <Button onClick={handleSave} style={{ marginTop: '20px', width: '100%' }}>Salva Impostazioni</Button>
        </Card>
      </div>
      
      <Card title="Centri di Costo" style={{ marginTop: '20px' }}>
        <Table
          columns={[
            { key: 'codice', label: 'Codice' },
            { key: 'nome', label: 'Nome' }
          ]}
          data={data.centriDiCosto}
        />
      </Card>
      
      <Card title="Servizi Offerti" style={{ marginTop: '20px' }}>
        <Table
          columns={[
            { key: 'nome', label: 'Servizio' },
            { key: 'importoStd', label: 'Importo Standard', render: (v) => v ? formatCurrency(v) : '-' }
          ]}
          data={data.servizi}
        />
      </Card>
    </div>
  );
};

// ============================================
// MAIN APP
// ============================================

export default function GestionaleStudio() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [data, setData] = useState(initialData);
  
  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard': return <DashboardSection data={data} />;
      case 'clienti': return <ClientiSection data={data} setData={setData} />;
      case 'contratti': return <ContrattiSection data={data} setData={setData} />;
      case 'incassi': return <IncassiSection data={data} setData={setData} />;
      case 'fatture': return <FatturazioneSection data={data} setData={setData} />;
      case 'costi': return <CostiSection data={data} setData={setData} />;
      case 'report': return <ReportSection data={data} />;
      case 'impostazioni': return <ImpostazioniSection data={data} setData={setData} />;
      default: return <DashboardSection data={data} />;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f0f2f5', fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <main style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
        {renderSection()}
      </main>
    </div>
  );
}
