import BreadCrumb from './Breadcrumb'

const TopBar = ({ img, title = 'Shop' }) => {
  return (
    <section
      className="relative flex min-h-[240px] w-full items-center justify-center bg-[#F9F1E7] bg-cover bg-center text-[#333333] sm:min-h-[316px]"
      style={{ backgroundImage: `url(${img})` }}
    >
      <div className="absolute inset-0 bg-white/25" aria-hidden="true" />
      <div className="relative z-10 flex flex-col items-center gap-3 px-4 text-center">
        <h1 className="text-4xl font-medium text-[#262626] sm:text-5xl">{title}</h1>
        <BreadCrumb items={[{ label: "Home", path: "/" }, { label: title, path: "/shop" }]} />
      </div>
    </section>
  )
}

export default TopBar;