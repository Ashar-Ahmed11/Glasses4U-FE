import React from 'react'
import AppContext from './context/appContext'
import Img1 from '../images/1.png'
import Img2 from '../images/2.png'
import Img3 from '../images/3.png'
import Img4 from '../images/4.png'
import { toast } from 'react-toastify'

// Tints catalog for Sunglasses (Always Dark)
const TINTS = [
  {
    key: 'solid',
    name: 'Solid Tint',
    price: 4.95,
    intensities: ['Light', 'Medium', 'Dark'],
    colors: [
      { name: 'Brown', image: 'https://www.goggles4u.com/pub/media/rx_images/color/Solid/Solid-Brown.png' },
      { name: 'Blue', image: 'https://www.goggles4u.com/pub/media/rx_images/color/Solid/Solid-Blue.png' },
      { name: 'Black', image: 'https://www.goggles4u.com/pub/media/rx_images/color/Solid/Solid-Black.png' },
      { name: 'Yellow', image: 'https://www.goggles4u.com/pub/media/rx_images/color/Solid/Solid-Yellow.png' },
      { name: 'Gray', image: 'https://www.goggles4u.com/pub/media/rx_images/color/Solid/Solid-Grey.png' },
      { name: 'Green', image: 'https://www.goggles4u.com/pub/media/rx_images/color/Solid/Solid-Green.png' },
    ],
  },
  {
    key: 'gradient',
    name: 'Gradient Tint Sunglasses',
    price: 9.25,
    colors: [
      { name: 'Grey Gradient', image: 'https://www.goggles4u.com/pub/media/rx_images/color/Gradient/Grey-Gradient.png' },
      { name: 'Yellow Gradient', image: 'https://www.goggles4u.com/pub/media/rx_images/color/Gradient/Yellow-Gradient.png' },
      { name: 'Green Gradient', image: 'https://www.goggles4u.com/pub/media/rx_images/color/Gradient/Green-Gradient.png' },
      { name: 'Blue Gradient', image: 'https://www.goggles4u.com/pub/media/rx_images/color/Gradient/Blue-Gradient.png' },
      { name: 'Black Gradient', image: 'https://www.goggles4u.com/pub/media/rx_images/color/Gradient/Black-Gradient.png' },
      { name: 'Brown Gradient', image: 'https://www.goggles4u.com/pub/media/rx_images/color/Gradient/Brown-Gradient.png' },
    ],
  },
  {
    key: 'mirror',
    name: 'Mirror Tint Sunglasses',
    price: 12.47,
    colors: [
      { name: 'Gold Mirror', image: 'https://www.goggles4u.com/pub/media/rx_images/color/Mirror/Gold-Mirror.png' },
      { name: 'Blue Mirror', image: 'https://www.goggles4u.com/pub/media/rx_images/color/Mirror/Blue-Mirror.png' },
      { name: 'Silver Mirror', image: 'https://www.goggles4u.com/pub/media/rx_images/color/Mirror/Grey-Mirror.png' },
    ],
  },
  {
    key: 'dual',
    name: 'Dual Tint',
    price: 11.97,
    colors: [
      { name: 'Black & Brown', image: 'https://www.goggles4u.com/pub/media/rx_images/color/Dual/black-and-brown.png' },
      { name: 'Brown & Yellow', image: 'https://www.goggles4u.com/pub/media/rx_images/color/Dual/brown-and-yellow.png' },
      { name: 'Blue & Yellow', image: 'https://www.goggles4u.com/pub/media/rx_images/color/Dual/blue-yellow.png' },
      { name: 'Green & Yellow', image: 'https://www.goggles4u.com/pub/media/rx_images/color/Dual/green-yellow.png' },
      { name: 'Blue & Pink', image: 'https://www.goggles4u.com/pub/media/rx_images/color/Dual/blue-pink.png' },
      { name: 'Grey & Pink', image: 'https://www.goggles4u.com/pub/media/rx_images/color/Dual/grey-pink.png' },
    ],
  },
  {
    key: 'polarized_mirror',
    name: 'Polarized Mirror Sunglasses',
    price: 15.95,
    colors: [
      { name: 'Silver Mirror', image: 'https://www.goggles4u.com/pub/media/rx_images/color/Mirror/Grey-Mirror.png' },
      { name: 'Blue Mirror', image: 'https://www.goggles4u.com/pub/media/rx_images/color/Mirror/Blue-Mirror.png' },
      { name: 'Gold Mirror', image: 'https://www.goggles4u.com/pub/media/rx_images/color/Mirror/Gold-Mirror.png' },
    ],
  },
  {
    key: 'polarized',
    name: 'Polarized Sunglasses',
    price: 12.95,
    colors: [
      { name: 'Polarized Grey', image: 'https://www.goggles4u.com/pub/media/rx_images/color/Solid/Solid-Grey.png' },
    ],
  },
]

const range = (start, end, step = 1) => {
  const out = []
  for (let v = start; v <= end + 1e-9; v += step) out.push(Number(v.toFixed(2)))
  return out
}

const toLabel = (n, opts = { sign: false, decimals: 2 }) => {
  const val = n.toFixed(opts.decimals ?? 2)
  return `${opts.sign && n >= 0 ? '+' : ''}${val}`
}

const sphValues = range(-12, 12, 0.25) // -12.00 … +12.00
const cylValues = range(-6, 6, 0.25) // -6.00 … +6.00
const addValues = range(0.75, 3.5, 0.25) // +0.75 … +3.50
const axisValues = Array.from({ length: 181 }, (_, i) => i) // 0 … 180
const pdValues = range(54, 74, 1) // 54 … 74 (binocular PD)
const pdMonoValues = range(25, 40, 0.5) // 25.0 … 40.0 (monocular PD)
const prismValues = [
  '5.00','4.75','4.50','4.25','4.00','3.75','3.50','3.25','3.00',
  '2.75','2.50','2.25','2.00','1.75','1.50','1.25','1.00','0.75','0.50','0.25','None'
]

const Select = ({ values, value, onChange, sign = false, decimals = 2, className = '', style }) => (
  <select className={`form-select ${className}`} style={style} value={value} onChange={onChange}>
    <option value="">{'Select'}</option>
    {values.map((v) => (
      <option key={v} value={v}>
        {typeof v === 'number' ? toLabel(v, { sign, decimals }) : v}
      </option>
    ))}
  </select>
)

const PrescriptionModal = ({ onComplete }) => {
  const { lenses, fetchLenses, basicInfo, getBasicInfo } = React.useContext(AppContext)
  const INITIAL_FORM = {
    // OD (Right)
    od_sph: '',
    od_cyl: '',
    od_axis: '',
    od_add: '',
    // OS (Left)
    os_sph: '',
    os_cyl: '',
    os_axis: '',
    os_add: '',
    // PD + name
    pd: '', // single PD (binocular)
    right_pd: '',
    left_pd: '',
    name: '',
    // Prism
    prismEnabled: false,
    od_prism_ver: '',
    od_prism_ver_dir: '',
    os_prism_ver: '',
    os_prism_ver_dir: '',
  }
  const [form, setForm] = React.useState(INITIAL_FORM)
  const [hasTwoPD, setHasTwoPD] = React.useState(false)
  const [step, setStep] = React.useState(1)
  const [rxType, setRxType] = React.useState(null) // 'distance' | 'reading' | 'bifocal' | 'progressive'
  const [lensType, setLensType] = React.useState(null) // 'clear' | 'photochromic'
  const [lensOption, setLensOption] = React.useState(null) // '1.56' | '1.61' | '1.67'
  const [coating, setCoating] = React.useState(null) // 'standard' | 'none'
  // Sunglasses tint state (when lensType === 'sunglasses')
  const [tintType, setTintType] = React.useState(null) // e.g., 'solid', 'gradient'
  const [tintIntensity, setTintIntensity] = React.useState(null) // Light | Medium | Dark (only for solid)
  const [tintColor, setTintColor] = React.useState(null) // { name, image }
  const pricedTints = React.useMemo(() => {
    const map = {
      solid: Number(basicInfo?.solidTintPrice || 0),
      gradient: Number(basicInfo?.gradientTintPrice || 0),
      mirror: Number(basicInfo?.mirrorTintPrice || 0),
      dual: Number(basicInfo?.dualTintPrice || 0),
      polarized_mirror: Number(basicInfo?.polarizedMirrorTintPrice || 0),
      polarized: Number(basicInfo?.polarizedTintPrice || 0),
    }
    return TINTS.map((t) => ({ ...t, price: map[t.key] ?? Number(t.price || 0) }))
  }, [basicInfo])
  const selectedTint = React.useMemo(() => pricedTints.find(t => t.key === tintType) || null, [tintType, pricedTints])

  const resetAll = React.useCallback(() => {
    setForm(INITIAL_FORM)
    setHasTwoPD(false)
    setStep(1)
    setRxType(null)
    setLensType(null)
    setLensOption(null)
    setCoating(null)
    setTintType(null)
    setTintIntensity(null)
    setTintColor(null)
  }, [])

  const [loading, setLoading] = React.useState(false)

  // Ensure basic info loaded for dynamic coating price
  React.useEffect(() => {
    (async () => {
      if (!basicInfo) {
        try { setLoading(true); await getBasicInfo() } finally { setLoading(false) }
      }
    })()
  }, [basicInfo, getBasicInfo])

  // Fetch lenses for Step 4 based on selections from steps 2 and 3
  const lastQueryRef = React.useRef('')
  React.useEffect(() => {
    const RX_MAP = { distance: 'Distance', reading: 'Reading', bifocal: 'Bifocal with line', progressive: 'Progressive (no line)' }
    const LT_MAP = { clear: 'Clear Lenses', photochromic: 'Photochromic - Dark in Sun', sunglasses: 'Sunglasses' }
    if (step === 4 && rxType && lensType) {
      const queryKey = `${rxType}|${lensType}`
      if (lastQueryRef.current !== queryKey) {
        lastQueryRef.current = queryKey
          ; (async () => {
            try { setLoading(true); await fetchLenses({ rxType: RX_MAP[rxType], lensType: LT_MAP[lensType] }) }
            finally { setLoading(false) }
          })()
      }
    }
  }, [step, rxType, lensType])

  // Reset when modal is closed
  React.useEffect(() => {
    const el = document.getElementById('exampleModal')
    if (!el) return
    const handler = () => resetAll()
    el.addEventListener('hidden.bs.modal', handler)
    return () => el.removeEventListener('hidden.bs.modal', handler)
  }, [resetAll])

  return (
    <div
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      style={{ zIndex: 99999999999}}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header border-0 pb-0">
            <nav className="w-100">
              <ul className="nav nav-pills justify-content-between">
                {[1, 2, 3, 4, 5].map((n) => (
                  <li key={n} className="nav-item">
                    <span
                      className={`badge rounded-circle ${n === (step === 31 ? 3 : step) ? 'bg-primary' : 'bg-light text-dark'}`}
                      style={{ width: 36, height: 36, lineHeight: '22px', fontSize: 16 }}
                    >
                      {n}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="d-flex justify-content-between small mt-2 px-1">
                <span>Prescription</span>
                <span>Rx Type</span>
                <span>Lens Type</span>
                <span>Lens Options</span>
                <span>Coating</span>
              </div>
            </nav>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div className="modal-body">
            {loading && (
              <div className="text-center my-3">
                <div className="spinner-border" role="status" style={{ width: 40, height: 40 }}>
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
            {step === 1 && (
              <>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h3 className="mb-0">Step 1 - Prescription</h3>
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => {
                      setForm((prev) => ({
                        ...prev,
                        od_sph: '', od_cyl: '', od_axis: '', od_add: '',
                        os_sph: '', os_cyl: '', os_axis: '', os_add: '',
                        pd: '', right_pd: '', left_pd: '',
                        prismEnabled: false,
                        od_prism_ver: '', od_prism_ver_dir: '',
                        os_prism_ver: '', os_prism_ver_dir: '',
                      }))
                      setHasTwoPD(false)
                    }}
                  >
                    Reset
                  </button>
                </div>
                {/* Desktop layout (original) */}
                <div className="d-none d-md-block">
                  <div className="row g-3">
                    <div className="col-12 col-lg-8">
                      <div className="row g-3 align-items-end">
                        <div className="col-12">
                          <div className="row text-uppercase small fw-semibold text-muted">
                            <div className="col-2"></div>
                            <div className="col-3 text-center">SPH</div>
                            <div className="col-3 text-center">CYL</div>
                            <div className="col-2 text-center">AXIS</div>
                            <div className="col-2 text-center">ADD</div>
                          </div>
                        </div>
                        {/* OD (Right) */}
                        <div className="col-12">
                          <div className="row g-2 align-items-center">
                            <div className="col-2 text-muted">OD (Right)</div>
                            <div className="col-3">
                              <Select values={sphValues} value={form.od_sph} onChange={(e) => setForm({ ...form, od_sph: parseFloat(e.target.value) })} sign />
                            </div>
                            <div className="col-3">
                              <Select values={cylValues} value={form.od_cyl} onChange={(e) => setForm({ ...form, od_cyl: parseFloat(e.target.value) })} sign />
                            </div>
                            <div className="col-2">
                              <Select className="py-2 px-2" values={axisValues} value={form.od_axis} onChange={(e) => setForm({ ...form, od_axis: parseInt(e.target.value, 10) })} decimals={0} />
                            </div>
                            <div className="col-2">
                              <Select className="py-2 px-2" values={addValues} value={form.od_add} onChange={(e) => setForm({ ...form, od_add: parseFloat(e.target.value) })} sign />
                            </div>
                          </div>
                        </div>
                        {/* OS (Left) */}
                        <div className="col-12">
                          <div className="row g-2 align-items-center">
                            <div className="col-2 text-muted">OS (Left)</div>
                            <div className="col-3">
                              <Select values={sphValues} value={form.os_sph} onChange={(e) => setForm({ ...form, os_sph: parseFloat(e.target.value) })} sign />
                            </div>
                            <div className="col-3">
                              <Select values={cylValues} value={form.os_cyl} onChange={(e) => setForm({ ...form, os_cyl: parseFloat(e.target.value) })} sign />
                            </div>
                            <div className="col-2">
                              <Select className="py-2 px-2" values={axisValues} value={form.os_axis} onChange={(e) => setForm({ ...form, os_axis: parseInt(e.target.value, 10) })} decimals={0} />
                            </div>
                            <div className="col-2">
                              <Select className="py-2 px-2" values={addValues} value={form.os_add} onChange={(e) => setForm({ ...form, os_add: parseFloat(e.target.value) })} sign />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* PD panel */}
                    <div className="col-12 col-lg-4">
                      <div className="p-3 border rounded-2">
                        <div className="text-uppercase text-center fw-bold mb-3">PD</div>
                        {!hasTwoPD ? (
                          <>
                            <select
                              className="form-select text-center fs-5 py-2"
                              value={form.pd}
                              onChange={(e) => setForm({ ...form, pd: parseInt(e.target.value, 10) })}
                            >
                              <option value="">{'Select'}</option>
                              {pdValues.map((pd) => (
                                <option key={pd} value={pd}>
                                  {pd}
                                </option>
                              ))}
                            </select>
                            <div className="text-center mt-3 mb-0">
                              <button type="button" className="btn btn-link p-0" onClick={() => setHasTwoPD(true)}>
                                I have 2 PD numbers
                              </button>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="row g-2">
                              <div className="col-6">
                                <div className="text-uppercase small text-muted mb-1 text-center">Right PD</div>
                                <select
                                  className="form-select text-center"
                                  value={form.right_pd}
                                  onChange={(e) => setForm({ ...form, right_pd: parseFloat(e.target.value) })}
                                >
                                  <option value="">{'Select'}</option>
                                  {pdMonoValues.map((pd) => (
                                    <option key={`r-${pd}`} value={pd}>
                                      {pd.toFixed(1)}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className="col-6">
                                <div className="text-uppercase small text-muted mb-1 text-center">Left PD</div>
                                <select
                                  className="form-select text-center"
                                  value={form.left_pd}
                                  onChange={(e) => setForm({ ...form, left_pd: parseFloat(e.target.value) })}
                                >
                                  <option value="">{'Select'}</option>
                                  {pdMonoValues.map((pd) => (
                                    <option key={`l-${pd}`} value={pd}>
                                      {pd.toFixed(1)}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            <div className="text-center mt-3 mb-0">
                              <button type="button" className="btn btn-link p-0" onClick={() => setHasTwoPD(false)}>
                                I have 1 PD number
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Mobile layout (stacked) */}
                <div className="d-md-none">
                  {/* Header: RIGHT / LEFT */}
                  <div className="row g-3 align-items-center mb-2">
                    <div className="col-12 col-md-2"></div>
                    <div className="col-6 col-md-5 text-uppercase small fw-semibold text-muted">Right OD</div>
                    <div className="col-6 col-md-5 text-uppercase small fw-semibold text-muted">Left OS</div>
                  </div>
                  {/* SPH */}
                  <div className="row g-2 align-items-center mb-2">
                    <div className="col-12 col-md-2 text-muted">SPH</div>
                    <div className="col-6 col-md-5">
                      <Select values={sphValues} value={form.od_sph} onChange={(e) => setForm({ ...form, od_sph: parseFloat(e.target.value) })} sign />
                    </div>
                    <div className="col-6 col-md-5">
                      <Select values={sphValues} value={form.os_sph} onChange={(e) => setForm({ ...form, os_sph: parseFloat(e.target.value) })} sign />
                    </div>
                  </div>
                  {/* CYL */}
                  <div className="row g-2 align-items-center mb-2">
                    <div className="col-12 col-md-2 text-muted">CYL</div>
                    <div className="col-6 col-md-5">
                      <Select values={cylValues} value={form.od_cyl} onChange={(e) => setForm({ ...form, od_cyl: parseFloat(e.target.value) })} sign />
                    </div>
                    <div className="col-6 col-md-5">
                      <Select values={cylValues} value={form.os_cyl} onChange={(e) => setForm({ ...form, os_cyl: parseFloat(e.target.value) })} sign />
                    </div>
                  </div>
                  {/* AXIS */}
                  <div className="row g-2 align-items-center mb-2">
                    <div className="col-12 col-md-2 text-muted">AXIS</div>
                    <div className="col-6 col-md-5">
                      <Select className="py-2 px-2" values={axisValues} value={form.od_axis} onChange={(e) => setForm({ ...form, od_axis: parseInt(e.target.value, 10) })} decimals={0} />
                    </div>
                    <div className="col-6 col-md-5">
                      <Select className="py-2 px-2" values={axisValues} value={form.os_axis} onChange={(e) => setForm({ ...form, os_axis: parseInt(e.target.value, 10) })} decimals={0} />
                    </div>
                  </div>
                  {/* ADD */}
                  <div className="row g-2 align-items-center mb-4">
                    <div className="col-12 col-md-2 text-muted">ADD</div>
                    <div className="col-6 col-md-5">
                      <Select className="py-2 px-2" values={addValues} value={form.od_add} onChange={(e) => setForm({ ...form, od_add: parseFloat(e.target.value) })} sign />
                    </div>
                    <div className="col-6 col-md-5">
                      <Select className="py-2 px-2" values={addValues} value={form.os_add} onChange={(e) => setForm({ ...form, os_add: parseFloat(e.target.value) })} sign />
                    </div>
                  </div>
                  {/* PD */}
                  <div className="row g-2 align-items-center mb-3">
                    <div className="col-12 col-md-2 text-muted">PD</div>
                    {!hasTwoPD ? (
                      <div className="col-12">
                        <div className="d-flex align-items-center gap-2">
                        <select
                            className="form-select"
                            value={form.pd}
                            onChange={(e) => setForm({ ...form, pd: parseInt(e.target.value, 10) })}
                          >
                          <option value="">{'Select'}</option>
                            {pdValues.map((pd) => (
                              <option key={`m-${pd}`} value={pd}>
                                {pd}
                              </option>
                            ))}
                          </select>
                          <button type="button" className="btn btn-link p-0" onClick={() => setHasTwoPD(true)}>
                            I have 2 PD numbers
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="col-12">
                        <div className="row g-2">
                          <div className="col-6">
                            <div className="text-uppercase small text-muted mb-1 text-center">Right PD</div>
                          <select
                              className="form-select text-center"
                              value={form.right_pd}
                              onChange={(e) => setForm({ ...form, right_pd: parseFloat(e.target.value) })}
                            >
                            <option value="">{'Select'}</option>
                              {pdMonoValues.map((pd) => (
                                <option key={`mr-${pd}`} value={pd}>
                                  {pd.toFixed(1)}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="col-6">
                            <div className="text-uppercase small text-muted mb-1 text-center">Left PD</div>
                          <select
                              className="form-select text-center"
                              value={form.left_pd}
                              onChange={(e) => setForm({ ...form, left_pd: parseFloat(e.target.value) })}
                            >
                            <option value="">{'Select'}</option>
                              {pdMonoValues.map((pd) => (
                                <option key={`ml-${pd}`} value={pd}>
                                  {pd.toFixed(1)}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="col-12 text-center">
                            <button type="button" className="btn btn-link p-0" onClick={() => setHasTwoPD(false)}>
                              I have 1 PD number
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Prism (responsive, below PD) */}
                <div className="mt-3">
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="usePrism"
                      checked={form.prismEnabled}
                      onChange={(e) => setForm({ ...form, prismEnabled: e.target.checked })}
                    />
                    <label className="form-check-label fw-semibold ms-2" htmlFor="usePrism">PRISM</label>
                  </div>

                  {form.prismEnabled && (
                    <div className="border rounded-2 p-3">
                      <div className="row g-2 small fw-semibold text-muted mb-2">
                        <div className="col-3 col-md-2">TYPE</div>
                        <div className="col-4 col-md-3">Prism</div>
                        <div className="col-5 col-md-3">Base Direction</div>
                      </div>

                      {/* RIGHT OD */}
                      <div className="row g-2 align-items-center mb-2">
                        <div className="col-3 col-md-2 text-muted">RIGHT OD</div>
                        <div className="col-4 col-md-3">
                          <select
                            className="form-select"
                            value={form.od_prism_ver}
                            onChange={(e) => setForm({ ...form, od_prism_ver: e.target.value })}
                          >
                            <option value="">{'Select'}</option>
                            {prismValues.map(v => (<option key={`odpv-${v}`} value={v}>{v}</option>))}
                          </select>
                        </div>
                        <div className="col-5 col-md-3">
                          <select
                            className="form-select"
                            value={form.od_prism_ver_dir}
                            onChange={(e) => setForm({ ...form, od_prism_ver_dir: e.target.value })}
                          >
                            <option value="">{'Select'}</option>
                            <option value="IN">IN</option>
                            <option value="OUT">OUT</option>
                            <option value="UP">UP</option>
                            <option value="DOWN">DOWN</option>
                          </select>
                        </div>
                      </div>

                      {/* LEFT OS */}
                      <div className="row g-2 align-items-center">
                        <div className="col-3 col-md-2 text-muted">LEFT-OS</div>
                        <div className="col-4 col-md-3">
                          <select
                            className="form-select"
                            value={form.os_prism_ver}
                            onChange={(e) => setForm({ ...form, os_prism_ver: e.target.value })}
                          >
                            <option value="">{'Select'}</option>
                            {prismValues.map(v => (<option key={`ospv-${v}`} value={v}>{v}</option>))}
                          </select>
                        </div>
                        <div className="col-5 col-md-3">
                          <select
                            className="form-select"
                            value={form.os_prism_ver_dir}
                            onChange={(e) => setForm({ ...form, os_prism_ver_dir: e.target.value })}
                          >
                            <option value="">{'Select'}</option>
                            <option value="IN">IN</option>
                            <option value="OUT">OUT</option>
                            <option value="UP">UP</option>
                            <option value="DOWN">DOWN</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <div className="d-flex gap-2 mt-3 justify-content-end">
                    <button
                      type="button"
                      className="btn btn-warning text-white"
                      onClick={() => {
                        setStep(2)
                      }}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h3 className="mb-1">Step 2 - Rx Type</h3>
                <div className="row g-3 mt-2">
                  {[
                    { key: 'distance', title: 'DISTANCE', desc: 'Corrects vision of distant objects. All time wear.', img: Img1 },
                    { key: 'reading', title: 'READING', desc: 'Corrects vision of near objects.', img: Img2 },
                    { key: 'bifocal', title: 'BIFOCAL WITH LINE', desc: 'Correct near & distance vision and has a visible line in the lens.', img: Img3 },
                    { key: 'progressive', title: 'PROGRESSIVE (NO LINE)', desc: 'Corrects near & distance vision and does not have any visible line.', img: Img4 },
                  ].map((item) => (
                    <div key={item.key} className="col-12 col-md-6">
                      <button
                        type="button"
                        onClick={() => { setRxType(item.key); setStep(3) }}
                        className={`w-100 text-start bg-white border rounded-3 p-4 h-100 ${rxType === item.key ? 'border-primary shadow' : ''}`}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="text-center fw-bold mb-3">{item.title}</div>
                        <hr className="my-3" />
                        <div className="d-flex align-items-center gap-3">
                          <div
                            className="rounded-circle bg-light border d-flex align-items-center justify-content-center px-5"
                            style={{
                              width: "96px",
                              height: "96px",
                              overflow: "hidden"   // 🔥 This is the key
                            }}
                          >
                            <img
                              src={item.img}
                              alt=""
                              style={{
                                maxWidth: "86px",
                                maxHeight: "85px",
                              }}
                            />
                          </div>
                          <p className="mb-0 text-muted">{item.desc}</p>
                        </div>
                      </button>
                    </div>
                  ))}
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <button type="button" className="btn btn-outline-secondary" onClick={() => setStep(1)}>Previous</button>
                  {/* <button type="button" className="btn btn-warning text-white" onClick={() => setStep(3)}>Next</button> */}
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <h3 className="mb-1">Step 3 - Lens Type</h3>
                <div className="row g-3 mt-2">
                  {[
                    { key: 'clear', title: 'CLEAR LENSES', desc: 'These lenses stays clear indoor and outdoor.' },
                    { key: 'photochromic', title: 'PHOTOCHROMIC - DARK IN SUN', desc: 'They will turn dark in sunlight and stays clear indoor.' },
                    { key: 'sunglasses', title: 'SUNGLASSES (ALWAYS DARK)', desc: 'Sunglasses in your prescription.' },
                  ].map((item) => (
                    <div key={item.key} className="col-12 col-md-6">
                      <button
                        type="button"
                        onClick={() => {
                          setLensType(item.key)
                          if (item.key !== 'sunglasses') setStep(4)
                          else {
                            // go to intermediate full-screen Tint Options step
                            setTintType(null); setTintIntensity(null); setTintColor(null)
                            setStep(31)
                          }
                        }}
                        className={`w-100 text-start bg-white border rounded-3 p-4 h-100 ${lensType === item.key ? 'border-primary shadow' : ''}`}
                      >
                        <div className="text-center fw-bold mb-3">{item.title}</div>
                        <hr className="my-3" />
                        <div className="d-flex align-items-center gap-3">
                          <div className="rounded-circle bg-light border d-flex align-items-center justify-content-center" style={{ width: 96, height: 96 }}>
                            <span className="fs-3">🕶️</span>
                          </div>
                          <p className="mb-0 text-muted">{item.desc}</p>
                        </div>
                      </button>
                    </div>
                  ))}
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <button type="button" className="btn btn-outline-secondary" onClick={() => setStep(2)}>Previous</button>
                  {/* <button type="button" className="btn btn-warning text-white" onClick={() => setStep(4)}>Next</button> */}
                </div>
              </>
            )}
            {/* Step 3.5 - Fullscreen Tint Options for Sunglasses */}
            {step === 31 && (
              <>
                <h3 className="mb-1">Tint Options </h3>
                <div className="row g-3 mt-2">
                  {pricedTints.map((t) => (
                    <div key={t.key} className="col-12 col-md-6">
                      <div className={`w-100 bg-white border rounded-3 p-3 h-100 ${tintType === t.key ? 'border-primary shadow' : ''}`}>
                        <div className="fw-bold text-center mb-2">{t.name} + ${t.price.toFixed(2)}</div>
                        <hr className="my-3" />
                        {t.key === 'solid' && (
                          <div className="mb-2 d-flex gap-2 justify-content-start">
                            {t.intensities.map((iv) => (
                              <button
                                key={iv}
                                type="button"
                                className={`btn btn-sm ${tintType === 'solid' && tintIntensity === iv ? 'btn-dark' : 'btn-outline-secondary'}`}
                                onClick={() => { setTintType('solid'); setTintIntensity(iv) }}
                              >
                                {iv}
                              </button>
                            ))}
                          </div>
                        )}
                        <div className="d-flex flex-wrap gap-3 align-items-center">
                          {t.colors.map((c) => {
                            const active = tintType === t.key && tintColor?.name === c.name
                            return (
                              <button
                                key={c.name}
                                type="button"
                                onClick={() => { setTintType(t.key); setTintColor(c) }}
                                className={`border-0 bg-transparent p-0 ${active ? 'shadow-sm' : ''}`}
                                title={c.name}
                              >
                                <img src={c.image} alt={c.name} style={{ width: 36, height: 36, borderRadius: '50%', border: active ? '2px solid #0d6efd' : '1px solid #ddd', objectFit: 'cover' }} />
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <button type="button" className="btn btn-outline-secondary" onClick={() => setStep(3)}>Previous</button>
                  <button
                    type="button"
                    className="btn btn-warning text-white"
                    disabled={!tintType || !tintColor || (tintType === 'solid' && !tintIntensity)}
                    onClick={() => setStep(4)}
                  >
                    Next
                  </button>
                </div>
              </>
            )}
            {step === 4 && (
              <>
                <h3 className="mb-1">Step 4 - Lens Options</h3>
                <div className="row g-3 mt-2">
                  {(() => {
                    const groupA = ['solid', 'gradient', 'mirror', 'dual'] // thickness > 0
                    const groupB = ['polarized_mirror', 'polarized'] // thickness == 0
                    const list = (() => {
                      if (lensType === 'sunglasses' && tintType) {
                        if (groupA.includes(tintType)) return (lenses || []).filter((l) => Number(l?.thickness || 0) > 0)
                        if (groupB.includes(tintType)) return (lenses || []).filter((l) => Number(l?.thickness || 0) === 0)
                      }
                      return lenses || []
                    })()
                    return list
                  })().map((item) => {
                    const thicknessLabel = item?.thickness !== undefined && item?.thickness !== '' ? Number(item.thickness).toFixed(2) : null
                    const titleUpper = String(item.title || '').toUpperCase()
                    const basePrice = Number(item.price || 0)
                    const sale = Number(item.salePrice || 0)
                    const displayPrice = sale > 0 ? sale : basePrice
                    const priceLabel = `$${Number(displayPrice).toFixed(2)}`
                    const heading = `${[thicknessLabel, titleUpper].filter(Boolean).join(' ')}+ ${priceLabel}`
                    return (
                      <div key={item._id} className="col-12 col-md-6">
                        <button
                          type="button"
                          onClick={() => { setLensOption(item._id); setStep(5) }}
                          className={`w-100 text-start bg-white border rounded-3 p-4 h-100 ${lensOption === item._id ? 'border-primary shadow' : ''}`}
                        >
                          <div className="fw-bold mb-2 text-center">{heading}</div>
                          {sale > 0 && (
                            <div className="text-center mb-1">
                              <span className="text-muted text-decoration-line-through me-2">${basePrice.toFixed(2)}</span>
                              <span className="text-danger fw-semibold">${sale.toFixed(2)}</span>
                            </div>
                          )}
                          <hr className="my-3" />
                          <div className="d-flex align-items-center gap-3">
                            <div className="rounded-circle bg-light border d-flex align-items-center justify-content-center overflow-hidden" style={item?.image ? {} : { width: 80, height: 80 }}>
                              {item?.image ? (
                                <img src={item.image} alt={item.title || 'Lens'} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                              ) : (
                                <span className="fs-3">🥽</span>
                              )}
                            </div>
                            <p className="mb-0 text-muted">{item.description}</p>
                          </div>
                        </button>
                      </div>
                    )
                  })}
                </div>
                <div className="d-flex justify-content-start mt-4">
                  <button type="button" className="btn btn-outline-secondary" onClick={() => setStep(3)}>Previous</button>
                </div>
              </>
            )}
            {step === 5 && (
              <>
                <h3 className="mb-1">Step 5 - Coating</h3>
                <div className="row g-3 mt-2">
                  {(() => {
                    const standardPrice = Number(basicInfo?.standardCoatingPrice || 0)
                    const premiumPrice = Number(basicInfo?.premiumCoatingPrice || 0)
                    const bluecutPrice = Number(basicInfo?.bluecutCoatingPrice || 0)
                    const items = [
                      { key: 'standard', title: `STANDARD COATINGS+ $${standardPrice.toFixed(2)}`, desc: 'Anti-Reflective, UV and Scratch Resistance', price: standardPrice },
                      { key: 'premium', title: `PREMIUM COATINGS+ $${premiumPrice.toFixed(2)}`, desc: 'Anti-Reflective, Hydrophobic, UV and Scratch Resistance', price: premiumPrice },
                      { key: 'bluecut', title: `BLUE CUT DIGITAL PROTECTION+ $${bluecutPrice.toFixed(2)}`, desc: 'Digital Screen Protection and All Premium Coatings', price: bluecutPrice },
                      { key: 'none', title: 'NO COATINGS+ $0.00', desc: 'There will be no protective layer to filter harmful rays.', price: 0 },
                    ]
                    return items
                  })().map((item) => (
                    <div key={item.key} className="col-12 col-md-6">
                      <button
                        type="button"
                        onClick={() => setCoating(item.key)}
                        className={`w-100 text-start bg-white border rounded-3 p-4 h-100 ${coating === item.key ? 'border-primary shadow' : ''}`}
                      >
                        <div className="fw-bold mb-3">{item.title}</div>
                        <hr className="my-3" />
                        <div className="d-flex align-items-center gap-3">
                          <div className="rounded-circle bg-light border d-flex align-items-center justify-content-center" style={{ width: 80, height: 80 }}>
                            <span className="fs-3">{item.key === 'standard' ? '✨' : '⭕'}</span>
                          </div>
                          <p className="mb-0 text-muted">{item.desc}</p>
                        </div>
                      </button>
                    </div>
                  ))}
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <button type="button" className="btn btn-outline-secondary" onClick={() => setStep(4)}>Previous</button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => {
                      const lens = (lenses || []).find((l) => String(l._id) === String(lensOption)) || null
                      const base = Number(lens?.price || 0)
                      const sale = Number(lens?.salePrice || 0)
                      const lensUnitPrice = sale > 0 ? sale : base
                      const standardPrice = Number(basicInfo?.standardCoatingPrice || 0)
                      const premiumPrice = Number(basicInfo?.premiumCoatingPrice || 0)
                      const bluecutPrice = Number(basicInfo?.bluecutCoatingPrice || 0)
                      const coatingMap = {
                        standard: { key: 'standard', title: 'Standard Coatings', price: standardPrice },
                        premium: { key: 'premium', title: 'Premium Coatings', price: premiumPrice },
                        bluecut: { key: 'bluecut', title: 'Blue Cut Digital Protection', price: bluecutPrice },
                        none: { key: 'none', title: 'No Coatings', price: 0 },
                      }
                      const payload = {
                        rxType,
                        lensType,
                            lens: lens ? { id: lens._id, title: lens.title, price: Number(lensUnitPrice || 0), thickness: lens.thickness } : null,
                        coating: coatingMap[coating] || { key: 'none', title: 'No Coatings', price: 0 },
                        ...(lensType === 'sunglasses' && selectedTint && tintColor ? {
                          tint: {
                            tintName: selectedTint.name,
                            tintPrice: selectedTint.price,
                            tintIntensity: selectedTint.key === 'solid' ? tintIntensity : undefined,
                            tintImage: tintColor.image,
                            tintColorName: tintColor.name,
                          }
                        } : {}),
                        prescription: {
                          hasTwoPD,
                          od: { sph: form.od_sph, cyl: form.od_cyl, axis: form.od_axis, add: form.od_add },
                          os: { sph: form.os_sph, cyl: form.os_cyl, axis: form.os_axis, add: form.os_add },
                          pd: hasTwoPD ? { right: form.right_pd, left: form.left_pd } : form.pd,
                          name: form.name,
                          ...(form.prismEnabled ? {
                            prism: {
                              od: { value: form.od_prism_ver || '', dir: form.od_prism_ver_dir || '' },
                              os: { value: form.os_prism_ver || '', dir: form.os_prism_ver_dir || '' },
                            }
                          } : {}),
                        },
                      }
                      try { onComplete && onComplete(payload) } catch { }
                      const el = document.getElementById('exampleModal')
                      const bs = window?.bootstrap
                      if (el && bs?.Modal) bs.Modal.getOrCreateInstance(el).hide()
                      // Ensure state resets immediately after adding to cart
                      resetAll()
                    }}
                  >
                    Add To Cart
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrescriptionModal