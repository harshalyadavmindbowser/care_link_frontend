interface ImgUrl {
  imgUrl: string
}
const ImageCard: React.FC<ImgUrl> = ({ imgUrl }) => {
  return (
    <div className='w-[150px] h-[150px] border rounded-2xl'>
      <img src={`${imgUrl}`} alt="No Image Added" className='rounded-2xl' />
    </div>
  )
}

export default ImageCard