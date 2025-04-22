import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Editor } from '@tinymce/tinymce-react';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const ModalEditNews = ({
  selectedNewsId,
  onClose,
  refreshNews,
  toast,
  isOpen,
  setOpen,
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const apiKey = import.meta.env.VITE_TINYMCE_API_KEY;
  const apiDatabaseUrl = import.meta.env.VITE_API_DATABASE;
  const { register, handleSubmit, setValue } = useForm();
  const [photoError, setPhotoError] = useState('');
  const [editorContent, setEditorContent] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    axios
      .get(`${apiDatabaseUrl}/api/news/${selectedNewsId}`)
      .then((response) => {
        const data = response.data;
        setValue('title', data.title);
        setValue('category', data.category);
        setEditorContent(data.content);
        setValue('image', data.image);
      })
      .catch((error) => console.error('Error fetching news detail:', error));
  }, [apiDatabaseUrl, selectedNewsId, setValue]);

  if(user) {
    const onSubmit = (formData) => {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('content', editorContent);
  
      if (fileInputRef.current.files[0]) {
        formDataToSend.append('image', fileInputRef.current.files[0]);
      }
      axios.put(`${apiDatabaseUrl}/api/news/edit/${selectedNewsId}`, formDataToSend)
        .then((response) => {
          if (response.status !== 200) {
            throw new Error('Failed to edit news');
          }
          return response.data;
        })
        .then(() => {
          toast.success('Berita berhasil diperbarui');
          refreshNews();
          onClose();
        })
        .catch((error) => {
          console.error('Error editing news:', error);
          toast.error('Berita gagal diperbarui');
        });
    };
  
    const handleClosePhotoError = () => {
      setPhotoError('');
    };
  
    const handlePhotoChange = (event) => {
      const file = event.target.files[0];
      const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  
      if (file && validImageTypes.includes(file.type)) {
        setPhotoError('');
      } else {
        setPhotoError('Mohon pilih foto dengan format file (JPG, JPEG, PNG)');
        fileInputRef.current.value = '';
      }
    };
  
    return (
      <Dialog
        open={isOpen}
        onClose={setOpen}
        className="fixed z-50 inset-0 overflow-y-auto flex items-center justify-center px-4"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />
        <div className="flex items-center justify-center min-h-screen p-4">
          <DialogPanel
            transition
            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full"
          >
            <DialogTitle className="text-2xl text-center font-extrabold text-primary-secondary-800 px-6 pt-4 uppercase">
              Edit Berita
            </DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="w-full">
                    <div className="mb-4">
                      <label
                        htmlFor="title"
                        className="block text-md font-semibold text-gray-800"
                      >
                        Judul Berita
                      </label>
                      <input
                        {...register('title')}
                        type="text"
                        id="title"
                        className="w-full px-3 py-2 text-gray-800 text-left bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="category"
                        className="block text-md font-semibold text-gray-800"
                      >
                        Kategori Berita
                      </label>
                      <input
                        {...register('category')}
                        type="text"
                        id="category"
                        className="mt-1 w-full px-3 py-2 text-gray-800 text-left bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="image"
                        className="text-md font-semibold text-gray-800"
                      >
                        Gambar Berita
                      </label>
                      {photoError && (
                        <div
                          className="bg-red-100 mb-3 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-2"
                          role="alert"
                        >
                          <strong className="font-bold">
                            File tidak Valid!{' '}
                          </strong>
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
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="content"
                        className="text-md font-semibold text-gray-800"
                      >
                        Isi Berita
                      </label>
                      <Editor
                        id="content"
                        apiKey={apiKey}
                        value={editorContent}
                        init={{
                          min_height: 100,
                          max_height: 300,
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
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-secondary-800 text-base font-medium text-white hover:bg-primary-secondary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Save Changes
                </button>
                <button
                  onClick={onClose}
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>
      /*
          <div className="fixed z-50 inset-0 overflow-y-auto flex items-center justify-center px-4">
              <div className="flex items-center justify-center min-h-screen pt-4 pb-20 text-center sm:block sm:p-0">
                  <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                      <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                  </div>
                  <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                  <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
                      <form onSubmit={handleSubmit(onSubmit)}>
                          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                              <div className="sm:flex sm:items-start">
                                  <div className="w-full">
                                      <div className="mb-4">
                                          <label htmlFor="title" className="block text-md font-semibold text-gray-800">Judul Berita</label>
                                          <input {...register('title')} type="text" id="title" className="w-full px-3 py-2 text-gray-800 text-left bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                      </div>
                                      <div className="mb-4">
                                          <label htmlFor="category" className="block text-md font-semibold text-gray-800">Kategori Berita</label>
                                          <input {...register('category')} type="text" id="category" className="mt-1 w-full px-3 py-2 text-gray-800 text-left bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                      </div>
                                      <div className="mb-4">
                                          <label htmlFor="image" className="text-md font-semibold text-gray-800">Gambar Berita</label>
                                          {photoError && (
                                              <div className="bg-red-100 mb-3 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-2" role="alert">
                                                  <strong className="font-bold">File tidak Valid! </strong>
                                                  <span className="block sm:inline">{photoError}</span>
                                                  <button type="button" onClick={handleClosePhotoError} className="absolute top-0 bottom-0 right-0 px-4 py-3">
                                                      <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                                                  </button>
                                              </div>
                                          )}
                                          <input
                                              id="image"
                                              type="file"
                                              name="image"
                                              accept='.jpg,.jpeg,.png'
                                              onChange={handlePhotoChange}
                                              ref={fileInputRef}
                                              className="w-full px-3 py-2 text-gray-800 text-center bg-gray-100 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                          />
                                      </div>
                                      <div className="mb-4">
                                          <label htmlFor="content" className="text-md font-semibold text-gray-800">Isi Berita</label>
                                          <Editor
                                              id="content"
                                              apiKey={apiKey}
                                              value={editorContent}
                                              init={{
                                                  min_height: 100,
                                                  max_height: 300,
                                                  menubar: true,
                                                  menu: {
                                                      file: { title: 'File', items: 'newdocument restoredraft | preview | importword exportpdf exportword | print | deleteallconversations' },
                                                      edit: { title: 'Edit', items: 'undo redo | cut copy paste pastetext | selectall | searchreplace' },
                                                      view: { title: 'View', items: 'code revisionhistory | visualaid visualchars visualblocks | spellchecker | preview fullscreen | showcomments' },
                                                      insert: { title: 'Insert', items: 'image link media addcomment pageembed codesample inserttable | math | charmap emoticons hr | pagebreak nonbreaking anchor tableofcontents | insertdatetime' },
                                                      format: { title: 'Format', items: 'bold italic underline strikethrough superscript subscript codeformat | styles blocks fontfamily fontsize align lineheight | forecolor backcolor | language | removeformat' },
                                                      tools: { title: 'Tools', items: 'spellchecker spellcheckerlanguage | a11ycheck code wordcount' },
                                                      help: { title: 'Help', items: 'help' }
                                                  },
                                                  plugins: [
                                                      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                                      'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                                      'insertdatetime', 'media', 'code', 'help', 'wordcount'
                                                  ],
                                                  toolbar:
                                                      "accordion addcomment aidialog aishortcuts aligncenter alignjustify alignleft alignnone alignright | anchor | blockquote blocks | backcolor | bold | casechange checklist copy cut | fontfamily fontsize forecolor h1 h2 h3 h4 h5 h6 hr indent | italic | language | lineheight | newdocument | outdent | paste pastetext | print exportpdf exportword importword | redo | remove removeformat | selectall | strikethrough | styles | subscript superscript underline | undo | visualaid | a11ycheck advtablerownumbering revisionhistory typopgraphy anchor restoredraft casechange charmap checklist code codesample addcomment showcomments ltr rtl editimage fliph flipv imageoptions rotateleft rotateright emoticons export footnotes footnotesupdate formatpainter fullscreen help image insertdatetime link openlink unlink bullist numlist media mergetags mergetags_list nonbreaking pagebreak pageembed permanentpen preview quickimage quicklink quicktable cancel save searchreplace showcomments spellcheckdialog spellchecker | template typography | insertfile inserttemplate addtemplate | visualblocks visualchars | wordcount",
                                                  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                              }}
                                              onEditorChange={(content, editor) => {
                                                  setEditorContent(content);
                                              }}
                                          />
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                              <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-secondary-800 text-base font-medium text-white hover:bg-primary-secondary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm">
                                  Save Changes
                              </button>
                              <button onClick={onClose} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                  Cancel
                              </button>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
          */
    );
  } else {
    return navigate('/unauthorized');
  }
};

ModalEditNews.propTypes = {
  selectedNewsId: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  refreshNews: PropTypes.func.isRequired,
  toast: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default ModalEditNews;
