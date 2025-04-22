import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Editor } from '@tinymce/tinymce-react';
import LogoSKA from '../../assets/logo-sentosa-transprent.png';
import { useAuth } from '../../hooks/useAuth';

const AddNewsSection = () => {
  const apiDatabaseUrl = import.meta.env.VITE_API_DATABASE;
  const apiKey = import.meta.env.VITE_TINYMCE_API_KEY;
  const [photoPreview, setPhotoPreview] = useState('');
  const [photoError, setPhotoError] = useState('');
  const { user } = useAuth();
  const [editorContent, setEditorContent] = useState('');
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const fileInputRef = useRef(null);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    try {
      setLoadingSubmit(true);
      const currentDate = new Date().toLocaleDateString('en-EN');
      const parts = currentDate.split('/');
      const formattedDate = `${parts[2]}/${parts[0].padStart(2, '0')}/${parts[1].padStart(2, '0')}`;

      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('image', fileInputRef.current.files[0]);
      formData.append('category', data.category);
      formData.append('date', formattedDate);
      formData.append('content', editorContent);
      formData.append('author_name', user ? user.full_name : 'Admin');
      formData.append('author_role', 'Penulis');
      formData.append(
        'author_image_url',
        user
          ? user.image_profile
          : LogoSKA,
      );

      axios.post(`${apiDatabaseUrl}/api/news/add`, formData)
        .then(() => {
          setLoadingSubmit(false);
          navigate('/berita');
        })
        .catch((error) => {
          console.error('Error saving news:', error);
          setLoadingSubmit(false);
        });
    } catch (error) {
      console.error('Error saving news:', error);
    }
  };

  const handleClosePhotoError = () => {
    setPhotoError('');
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png'];

    if (file && validImageTypes.includes(file.type)) {
      setPhotoPreview(URL.createObjectURL(file));
      setPhotoError('');
    } else {
      setPhotoPreview('');
      setPhotoError('Mohon pilih foto dengan format file (JPG, JPEG, PNG)');
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-white py-20 sm:py-18 relative z-10">
      <div className="mx-auto max-w-7xl px-6 items-center justify-center lg:px-8">
        <div className="mx-auto mb-10 max-w-2xl lg:text-center">
          <p className="mt-5 text-3xl font-extrabold tracking-tight text-gray-800 sm:text-4xl uppercase">
            Menambahkan Berita Terbaru
          </p>
        </div>
        <div className="max-w-3xl mx-auto px-4 py-1 bg-white shadow-lg rounded-lg">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
            encType="multipart/form-data"
          >
            <div className="flex flex-col">
              <label
                htmlFor="title"
                className="text-md font-semibold text-gray-800 mb-4"
              >
                Judul Berita
              </label>
              <input
                id="title"
                type="text"
                {...register('title')}
                className="w-full px-3 py-2 text-gray-800 text-center bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                required
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="category"
                className="text-md font-semibold text-gray-800 mb-4"
              >
                Kategori Berita
              </label>
              <input
                id="category"
                type="text"
                {...register('category')}
                className="w-full px-3 py-2 text-gray-800 text-center bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                required
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="image"
                className="text-md font-semibold text-gray-800 mb-4"
              >
                Gambar Berita
              </label>
              {photoError && (
                <div
                  className="bg-red-100 mb-3 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-2"
                  role="alert"
                >
                  <strong className="font-bold">File tidak Valid! </strong>
                  <span className="block sm:inline">{photoError}</span>
                  <button
                    type="button"
                    onClick={handleClosePhotoError}
                    className="absolute top-0 bottom-0 right-0 px-4 py-3"
                  >
                    <svg
                      className="fill-current h-6 w-6 text-red-500"
                      role="button"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <title>Close</title>
                      <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                    </svg>
                  </button>
                </div>
              )}
              <input
                id="image"
                type="file"
                name="image"
                accept=".jpg,.jpeg,.png"
                onChange={handlePhotoChange}
                ref={fileInputRef}
                className="w-full px-3 py-2 text-gray-800 text-center bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {photoPreview && (
                <div className="mt-4 p-2 border border-gray-300 rounded-md flex justify-center">
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="rounded-md"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="content"
                className="text-md font-semibold text-gray-800 mb-4"
              >
                Isi Berita
              </label>
              <Editor
                id="content"
                apiKey={apiKey}
                initialValue=""
                value={editorContent}
                init={{
                  height: 500,
                  menubar: true,
                  menu: {
                    file: {
                      title: 'File',
                      items:
                        'newdocument restoredraft | preview | importword exportpdf exportword | print | deleteallconversations',
                    },
                    edit: {
                      title: 'Edit',
                      items:
                        'undo redo | cut copy paste pastetext | selectall | searchreplace',
                    },
                    view: {
                      title: 'View',
                      items:
                        'code revisionhistory | visualaid visualchars visualblocks | spellchecker | preview fullscreen | showcomments',
                    },
                    insert: {
                      title: 'Insert',
                      items:
                        'image link media addcomment pageembed codesample inserttable | math | charmap emoticons hr | pagebreak nonbreaking anchor tableofcontents | insertdatetime',
                    },
                    format: {
                      title: 'Format',
                      items:
                        'bold italic underline strikethrough superscript subscript codeformat | styles blocks fontfamily fontsize align lineheight | forecolor backcolor | language | removeformat',
                    },
                    tools: {
                      title: 'Tools',
                      items:
                        'spellchecker spellcheckerlanguage | a11ycheck code wordcount',
                    },
                    help: { title: 'Help', items: 'help' },
                  },
                  plugins: [
                    'advlist',
                    'autolink',
                    'lists',
                    'link',
                    'image',
                    'charmap',
                    'preview',
                    'anchor',
                    'searchreplace',
                    'visualblocks',
                    'code',
                    'fullscreen',
                    'insertdatetime',
                    'media',
                    'code',
                    'help',
                    'wordcount',
                  ],
                  toolbar:
                    'accordion addcomment aidialog aishortcuts aligncenter alignjustify alignleft alignnone alignright | anchor | blockquote blocks | backcolor | bold | casechange checklist copy cut | fontfamily fontsize forecolor h1 h2 h3 h4 h5 h6 hr indent | italic | language | lineheight | newdocument | outdent | paste pastetext | print exportpdf exportword importword | redo | remove removeformat | selectall | strikethrough | styles | subscript superscript underline | undo | visualaid | a11ycheck advtablerownumbering revisionhistory typopgraphy anchor restoredraft casechange charmap checklist code codesample addcomment showcomments ltr rtl editimage fliph flipv imageoptions rotateleft rotateright emoticons export footnotes footnotesupdate formatpainter fullscreen help image insertdatetime link openlink unlink bullist numlist media mergetags mergetags_list nonbreaking pagebreak pageembed permanentpen preview quickimage quicklink quicktable cancel save searchreplace showcomments spellcheckdialog spellchecker | template typography | insertfile inserttemplate addtemplate | visualblocks visualchars | wordcount',
                  content_style:
                    'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                }}
                onEditorChange={(content) => {
                  setEditorContent(content);
                }}
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={loadingSubmit}
                className="w-full py-2.5 text-center text-sm font-medium text-white bg-primary-secondary-800 rounded-lg hover:bg-primary-secondary-900 transition duration-400 ease-in-out"
              >
                {loadingSubmit ? (
                  <div className="flex flex-col justify-center items-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-white rounded-full"
                      viewBox="0 0 24 24"
                    ></svg>
                  </div>
                ) : (
                  'Simpan Berita'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewsSection;
