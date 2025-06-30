import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Table() {
    const [data, setData] = useState([]);
    const [showAdd, setShowAdd] = useState(false)
    const [id, setId] = useState(null)
    const [editId, setEditId] = useState(null)

    useEffect(() => {
        // fetch('https://67ee3f31c11d5ff4bf78e003.mockapi.io/oxuaz')
        //     .then(res => res.json())
        //     .then(data => {
        //         setData(data)
        //     })

        axios.get('https://67ee3f31c11d5ff4bf78e003.mockapi.io/oxuaz')
        .then(res => setData(res.data))
    }, [])

    return (
        <div className="relative overflow-x-auto sm:rounded-lg">
            <div className="text-end mb-5">
                <button onClick={() => setShowAdd(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                    Əlavə et
                </button>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="p-4">
                            <div className="flex items-center">
                                <input
                                    id="checkbox-all-search"
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label htmlFor="checkbox-all-search" className="sr-only">
                                    checkbox
                                </label>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Position
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(item => (<tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="w-4 p-4" >
                                <div className="flex items-center">
                                    <input
                                        id="checkbox-table-search-1"
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label htmlFor="checkbox-table-search-1" className="sr-only">
                                        checkbox
                                    </label>
                                </div>
                            </td>
                            <th
                                scope="row"
                                className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                            >
                                <img
                                    className="w-10 h-10 rounded-full"
                                    src={item.img}
                                    alt={item.title}
                                />
                                <div className="ps-3 truncate px-1 w-[200px]">
                                    {item.title}
                                </div>
                            </th>
                            <td className="px-6 py-4" dangerouslySetInnerHTML={{ __html: item.description.slice(0, 200) }}></td>
                            <td className="px-6 py-4">
                                {
                                    item.is_popular ? 'Populyardir' : 'Normal Xeber'
                                }
                            </td>
                            <td className="px-6 py-4">
                                <a
                                    onClick={() => setEditId(item.id)}
                                    href="#"
                                    type="button"
                                    data-modal-target="editUserModal"
                                    data-modal-show="editUserModal"
                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                >
                                    Edit user
                                </a>
                            </td>
                            <td className="px-6 py-4">
                                <a
                                    onClick={() => setId(item.id)}
                                    href="#"
                                    type="button"
                                    data-modal-target="editUserModal"
                                    data-modal-show="editUserModal"
                                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                                >
                                    Delete user
                                </a>
                            </td>
                        </tr>))
                    }
                </tbody>
            </table>

            {showAdd && <AddNews setShowAdd={setShowAdd} setData={setData} />}
            {id && <DeleteNews id={id} setId={setId} setData={setData} />}
            {editId && <EditNews editId={editId} setEditId={setEditId} data={data} setData={setData} />}
        </div>

    )
}

function AddNews({ setShowAdd, setData }) {
    const initialValue = {
        title: '',
        img: '',
        description: '',
        is_popular: false,
    }

    const [value, setValue] = useState(initialValue)

    function submit(e) {
        e.preventDefault()
        setData(prev => [value, ...prev])
        setValue(initialValue)
        setShowAdd(false)
        toast.success("Əlavə edildi!")
    }


    return (
        <div onClick={() => { setShowAdd(false) }} className="fixed inset-0 grid place-items-center bg-[#ffffff76]">
            <form onSubmit={submit} onClick={(e) => e.stopPropagation()} className="max-w-sm mx-auto min-w-[500px] bg-gray-200 p-6 rounded-2xl">
                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Sekil elave et
                    </label>
                    <input
                        onChange={(e) => {
                            setValue({ ...value, img: e.target.value })
                        }}
                        type="text"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Sekil elave et"
                        required=""
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Basliq elave et
                    </label>
                    <input
                        onChange={(e) => {
                            setValue({ ...value, title: e.target.value })
                        }}
                        type="text"
                        placeholder="Xeberler..."
                        id="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required=""
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Haqqinda elave et
                    </label>
                    <textarea onChange={(e) => {
                        setValue({ ...value, description: e.target.value })
                    }}
                        className="min-h-[250px] min-w-[100%] border border-white bg-white rounded-lg p-2"></textarea>
                </div>
                <div className="mb-5">
                    Populyardir
                    <input
                        onClick={(e) => {
                            setValue({ ...value, is_popular: e.target.checked })
                        }}
                        type="checkbox" className="rounded-xl ms-2"
                    />
                </div>
                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

function DeleteNews({ id, setId, setData }) {

    function sil() {
        setData(item => item.filter(data => data.id != id))
        setId(null)
        toast.success("Silindi!")
    }

    return (
        <div
            onClick={() => setId(null)}
            className="fixed bg-[#ffffff76] inset-0 grid place-items-center">
            <div className="flex flex-col max-w-md gap-2 p-6 rounded-md shadow-md bg-gray-200 dark:text-gray-800">
                <h2 className="flex items-center gap-2 text-xl font-semibold leading-tight tracking-wide">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 h-6 fill-current shrink-0 dark:text-violet-600">
                        <path d="M451.671,348.569,408,267.945V184c0-83.813-68.187-152-152-152S104,100.187,104,184v83.945L60.329,348.568A24,24,0,0,0,81.432,384h86.944c-.241,2.636-.376,5.3-.376,8a88,88,0,0,0,176,0c0-2.7-.135-5.364-.376-8h86.944a24,24,0,0,0,21.1-35.431ZM312,392a56,56,0,1,1-111.418-8H311.418A55.85,55.85,0,0,1,312,392ZM94.863,352,136,276.055V184a120,120,0,0,1,240,0v92.055L417.137,352Z"></path>
                        <rect width="32" height="136" x="240" y="112"></rect>
                        <rect width="32" height="32" x="240" y="280"></rect>
                    </svg>Necessitatibus dolores quasi quae?
                </h2>
                <p className="flex-1 dark:text-gray-600">Mauris et lorem at elit tristique dignissim et ullamcorper elit. In sed feugiat mi. Etiam ut lacinia dui.</p>
                <div className="flex flex-col justify-end gap-3 mt-6 sm:flex-row">
                    <button
                        onClick={() => setId(null)}
                        className="cursor-pointer px-6 py-2 rounded-sm">No</button>
                    <button
                        onClick={sil}
                        className="cursor-pointer px-6 py-2 rounded-sm shadow-sm bg-violet-600 text-gray-50">Yes</button>
                </div>
            </div>
        </div>
    )
}

function EditNews({ editId, setEditId, data, setData }) {
    const obj = data.find(item => item.id == editId)
    const [value, setValue] = useState(obj)
    
    function editFunc(e){
        e.preventDefault();

        const ind = data.findIndex(item=> item.id === editId)
        data[ind] = value
        console.log([...data] );
        
        setData(data)
        setEditId(null)
        toast.success("Düzıliş edildi!")
    } 

    return (
        <div onClick={() => { setEditId(null) }} className="fixed inset-0 grid place-items-center bg-[#ffffff76]">
            <form
                onSubmit={editFunc} 
                onClick={(e) => e.stopPropagation()} className="max-w-sm mx-auto min-w-[500px] bg-gray-200 p-6 rounded-2xl">
                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Sekil elave et
                    </label>
                    <input
                        value={value.img}
                        onChange={(e) => {
                            setValue({ ...value, img: e.target.value })
                        }}
                        type="text"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Sekil elave et"
                        required=""
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Basliq elave et
                    </label>
                    <input
                        value={value.title}
                        onChange={(e) => {
                            setValue({ ...value, title: e.target.value })
                        }}
                        type="text"
                        placeholder="Xeberler..."
                        id="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required=""
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Haqqinda elave et
                    </label>
                    <textarea
                        value={value.description}
                        onChange={(e) => {
                            setValue({ ...value, description: e.target.value })
                        }}
                        className="min-h-[250px] min-w-[100%] border border-white bg-white rounded-lg p-2"></textarea>
                </div>
                <div className="mb-5">
                    Populyardir
                    <input
                        checked={value.is_popular}
                        onClick={(e) => {
                            setValue({ ...value, is_popular: e.target.checked })
                        }}
                        type="checkbox" className="rounded-xl ms-2"
                    />
                </div>
                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

export default Table
