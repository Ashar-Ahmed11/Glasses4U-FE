import React, { useEffect, useContext } from "react";
import AppContext from "../context/appContext";
import Cropper from "react-easy-crop";


export default function ImageAdjuster({ imageUrl, setEditImageUrl, onUploaded, modalId }) {
    const { uploadImage } = useContext(AppContext)
	// const date = new Date(1678563468 * 1000)
	// console.log(date.toUTCString())

    const inputRef = React.useRef();

    const triggerFileSelectPopup = () => { if (inputRef.current) { inputRef.current.value = ''; } inputRef.current.click(); }

	const [image, setImage] = React.useState(null);
	const [croppedArea, setCroppedArea] = React.useState(null);

	useEffect(() => {
	  if(imageUrl){
		setImage(imageUrl.url)
		
		

	  }
	  else{
		setImage(null)
		
	  }
	  
	  return () => {
		setImage(null)
		setZoom(1)
		setCrop({x:0,y:0})
		setCroppedArea(null)

	  }
	}, [imageUrl])

	

	
	
	const [crop, setCrop] = React.useState({ x: 0, y: 0 });
	const [zoom, setZoom] = React.useState(1);
	const [uploading, setUploading] = React.useState(false);

	const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
		setCroppedArea(croppedAreaPixels);
	};

    const onSelectFile = (event) => {
		if (event.target.files && event.target.files.length > 0) {
			const reader = new FileReader();
			reader.readAsDataURL(event.target.files[0]);
			reader.addEventListener("load", () => {
                setImage(reader.result);
                setZoom(1)
                setCrop({ x: 0, y: 0 })
                setCroppedArea(null)
			});
		}
	};

const createCroppedBlob = async () => {
		const img = await new Promise((res) => { const i = new Image(); i.onload = () => res(i); i.src = image })
		const canvas = document.createElement('canvas')
		canvas.width = croppedArea.width; canvas.height = croppedArea.height
		const ctx = canvas.getContext('2d')
		ctx.drawImage(img, croppedArea.x, croppedArea.y, croppedArea.width, croppedArea.height, 0, 0, croppedArea.width, croppedArea.height)
		return await new Promise((resolve) => canvas.toBlob((b) => resolve(b), 'image/png'))
	}

const onUpload = async () => {
		try {
			setUploading(true)
			const blob = await createCroppedBlob()
			const file = new File([blob], `crop_${Date.now()}.png`, { type: 'image/png' })
			const url = await uploadImage(file)
			onUploaded && onUploaded(url)
			setEditImageUrl && setEditImageUrl(null)
			setImage(null); setZoom(1); setCrop({ x: 0, y: 0 }); setCroppedArea(null)
		} finally {
			setUploading(false)
		}
	}

    // Reset state when Bootstrap modal closes
    useEffect(() => {
        if (!modalId) return
        const el = document.getElementById(modalId)
        if (!el) return
        const handler = () => {
            setImage(null)
            setZoom(1)
            setCrop({ x: 0, y: 0 })
            setCroppedArea(null)
            if (inputRef.current) inputRef.current.value = ''
        }
        el.addEventListener('hidden.bs.modal', handler)
        return () => el.removeEventListener('hidden.bs.modal', handler)
    }, [modalId])

	

	return (
		<div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
			<div className='container-cropper'>
				{image && (
					<>
						<div className='cropper' style={{ position: "relative", width: "100%", height: "300px", background: "#f8f9fa", borderRadius: "8px", overflow: "hidden" }}>
							<Cropper
								image={image}
								crop={crop}
								zoom={zoom}
								aspect={16 / 9}
								onCropChange={setCrop}
								onZoomChange={setZoom}
								onCropComplete={onCropComplete}
							/>
						</div>
						<div className='slider' style={{ marginTop: "8px" }}>
							<input
								type="range"
								min="1"
								max="3"
								step="0.1"
								value={zoom}
								onChange={(e) => setZoom(Number(e.target.value))}
								className="form-range w-100"
							/>
						</div>
					</>
				)}
			</div>

			<div className='container-buttons d-flex align-items-center gap-2'>
				<input
					type='file'
					accept='image/*'
					ref={inputRef}
					onChange={onSelectFile}
					style={{ display: "none" }}
				/>
				<button type="button" className="btn btn-primary" onClick={triggerFileSelectPopup}>Choose</button>
				<button type="button" className="btn btn-secondary" onClick={onUpload} disabled={!image || uploading}>
					{uploading && <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>}
					{uploading ? 'Uploading...' : 'Upload'}
				</button>
			</div>
		</div>
	);
}
