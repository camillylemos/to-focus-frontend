import { TextareaAutosize } from '@mui/material'

const Textarea = ({ formData, handleChange }) => {
  return (
    <TextareaAutosize
      {...formData}
      minRows={3}
      style={{
        resize: 'none',
        width: 500,
        background: 'transparent',
        borderRadius: '3px',
        ':focus': {
          borderColor: '#f29166',
        },
      }}
      onChange={handleChange}
    />
  )
}

export { Textarea }
