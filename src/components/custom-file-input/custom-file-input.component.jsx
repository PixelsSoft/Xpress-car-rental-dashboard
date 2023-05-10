import './styles.css'

export default function CustomFileInput({ ...rest }) {
    return (
        <label class="file-upload">
            <input type="file" {...rest} name="fileToUpload" id="fileToUpload" />
            Choose Files
        </label>
    )
}