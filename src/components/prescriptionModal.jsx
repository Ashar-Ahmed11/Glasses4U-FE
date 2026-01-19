import React from 'react'
import AppContext from './context/appContext'

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

const Select = ({ values, value, onChange, sign = false, decimals = 2 }) => (
  <select className="form-select" value={value} onChange={onChange}>
    {values.map((v) => (
      <option key={v} value={v}>
        {typeof v === 'number' ? toLabel(v, { sign, decimals }) : v}
      </option>
    ))}
  </select>
)

const PrescriptionModal = () => {
  const { lenses, fetchLenses } = React.useContext(AppContext)
  const [form, setForm] = React.useState({
    // OD (Right)
    od_sph: -1.0,
    od_cyl: -1.5,
    od_axis: 3,
    od_add: 3.25,
    // OS (Left)
    os_sph: -2.5,
    os_cyl: -2.25,
    os_axis: 76,
    os_add: 3.25,
    // PD + name
    pd: 69, // single PD (binocular)
    right_pd: 31.5,
    left_pd: 31.5,
    name: '',
  })
  const [hasTwoPD, setHasTwoPD] = React.useState(false)
  const [step, setStep] = React.useState(1)
  const [rxType, setRxType] = React.useState(null) // 'distance' | 'reading' | 'bifocal' | 'progressive'
  const [lensType, setLensType] = React.useState(null) // 'clear' | 'photochromic'
  const [lensOption, setLensOption] = React.useState(null) // '1.56' | '1.61' | '1.67'
  const [coating, setCoating] = React.useState(null) // 'standard' | 'none'

  // Fetch lenses for Step 4 based on selections from steps 2 and 3
  React.useEffect(() => {
    const RX_MAP = { distance: 'Distance', reading: 'Reading', bifocal: 'Bifocal with line', progressive: 'Progressive (no line)' }
    const LT_MAP = { clear: 'Clear Lenses', photochromic: 'Photochromic - Dark in Sun' }
    if (step === 4 && rxType && lensType) {
      fetchLenses({ rxType: RX_MAP[rxType], lensType: LT_MAP[lensType] })
    }
  }, [step, rxType, lensType, fetchLenses])

    return (
    <div
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header border-0 pb-0">
            <nav className="w-100">
              <ul className="nav nav-pills justify-content-between">
                {[1, 2, 3, 4, 5].map((n) => (
                  <li key={n} className="nav-item">
                    <span
                      className={`badge rounded-circle ${n === step ? 'bg-primary' : 'bg-light text-dark'}`}
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
            {step === 1 && (
              <>
                <h3 className="mb-4">Step 1 - Prescription</h3>
                {/* Desktop layout (original) */}
                <div className="d-none d-md-block">
                  <div className="row g-3">
                    <div className="col-12 col-lg-8">
                      <div className="row g-3 align-items-end">
                        <div className="col-12">
                          <div className="row text-uppercase small fw-semibold text-muted">
                            <div className="col-3">SPH</div>
                            <div className="col-3">CYL</div>
                            <div className="col-3">AXIS</div>
                            <div className="col-3">ADD</div>
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
                              <Select values={axisValues} value={form.od_axis} onChange={(e) => setForm({ ...form, od_axis: parseInt(e.target.value, 10) })} decimals={0} />
                            </div>
                            <div className="col-2">
                              <Select values={addValues} value={form.od_add} onChange={(e) => setForm({ ...form, od_add: parseFloat(e.target.value) })} sign />
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
                              <Select values={axisValues} value={form.os_axis} onChange={(e) => setForm({ ...form, os_axis: parseInt(e.target.value, 10) })} decimals={0} />
                            </div>
                            <div className="col-2">
                              <Select values={addValues} value={form.os_add} onChange={(e) => setForm({ ...form, os_add: parseFloat(e.target.value) })} sign />
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
                    <Select values={axisValues} value={form.od_axis} onChange={(e) => setForm({ ...form, od_axis: parseInt(e.target.value, 10) })} decimals={0} />
                  </div>
                  <div className="col-6 col-md-5">
                    <Select values={axisValues} value={form.os_axis} onChange={(e) => setForm({ ...form, os_axis: parseInt(e.target.value, 10) })} decimals={0} />
                  </div>
                </div>
                {/* ADD */}
                <div className="row g-2 align-items-center mb-4">
                  <div className="col-12 col-md-2 text-muted">ADD</div>
                  <div className="col-6 col-md-5">
                    <Select values={addValues} value={form.od_add} onChange={(e) => setForm({ ...form, od_add: parseFloat(e.target.value) })} sign />
                  </div>
                  <div className="col-6 col-md-5">
                    <Select values={addValues} value={form.os_add} onChange={(e) => setForm({ ...form, os_add: parseFloat(e.target.value) })} sign />
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

                <div className="mt-4">
                  <div className="d-flex gap-2 mt-3 justify-content-end">
                    <button type="button" className="btn btn-warning text-white" onClick={() => setStep(2)}>Next</button>
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h3 className="mb-1">Step 2 - Rx Type</h3>
                <div className="row g-3 mt-2">
                  {[
                    { key: 'distance', title: 'DISTANCE', desc: 'Corrects vision of distant objects. All time wear.' },
                    { key: 'reading', title: 'READING', desc: 'Corrects vision of near objects.' },
                    { key: 'bifocal', title: 'BIFOCAL WITH LINE', desc: 'Correct near & distance vision and has a visible line in the lens.' },
                    { key: 'progressive', title: 'PROGRESSIVE (NO LINE)', desc: 'Corrects near & distance vision and does not have any visible line.' },
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
                          <div className="rounded-circle bg-light border d-flex align-items-center justify-content-center" style={{ width: 96, height: 96 }}>
                            <span className="fs-3">👓</span>
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
                  ].map((item) => (
                    <div key={item.key} className="col-12 col-md-6">
                      <button
                        type="button"
                        onClick={() => { setLensType(item.key); setStep(4) }}
                        className={`w-100 text-start bg-white border rounded-3 p-4 h-100 ${lensType === item.key ? 'border-primary shadow' : ''}`}
                      >
                        <div className="text-center fw-bold mb-3">{item.title}</div>
                        <hr className="my-3" />
                        <div className="d-flex align-items-center gap-3">
                          <div className="rounded-circle bg-light border d-flex align-items-center justify-content-center" style={{ width: 96, height: 96 }}>
                            <span className="fs-3">🥽</span>
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
            {step === 4 && (
              <>
                <h3 className="mb-1">Step 4 - Lens Options</h3>
                <div className="row g-3 mt-2">
                  {(lenses || []).map((item) => {
                    const thicknessLabel = item?.thickness !== undefined && item?.thickness !== '' ? Number(item.thickness).toFixed(2) : null
                    const titleUpper = String(item.title || '').toUpperCase()
                    const priceLabel = `$${Number(item.price || 0).toFixed(2)}`
                    const heading = `${[thicknessLabel, titleUpper].filter(Boolean).join(' ')}+ ${priceLabel}`
                    return (
                    <div key={item._id} className="col-12 col-md-6">
                      <button
                        type="button"
                        onClick={() => { setLensOption(item._id); setStep(5) }}
                        className={`w-100 text-start bg-white border rounded-3 p-4 h-100 ${lensOption === item._id ? 'border-primary shadow' : ''}`}
                      >
                        <div className="fw-bold mb-2 text-center">{heading}</div>
                        <hr className="my-3" />
                        <div className="d-flex align-items-center gap-3">
                          <div className="rounded-circle bg-light border d-flex align-items-center justify-content-center" style={{ width: 80, height: 80 }}>
                            <span className="fs-3">🥽</span>
                          </div>
                          <p className="mb-0 text-muted">{item.description}</p>
                        </div>
                      </button>
                    </div>
                  )})}
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
                  {[
                    { key: 'standard', title: 'STANDARD COATINGS+ $5.95', desc: 'Anti-Reflective, UV and Scratch Resistance' },
                    { key: 'none', title: 'NO COATINGS+ $0.00', desc: 'There will be no protective layer to filter harmful rays.' },
                  ].map((item) => (
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
                <div className="d-flex justify-content-start mt-4">
                  <button type="button" className="btn btn-outline-secondary" onClick={() => setStep(4)}>Previous</button>
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