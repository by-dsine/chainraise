import NewOffering from '../../../components/admin/NewOffering'
import Header from '../../../components/navigation/Header'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function NewOfferingPage() {
  return (
    <div className="min-h-full">
      <Header />
      <div className="px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
        <div className="flex flex-1 flex-col">
          <main className="flex-1 pb-8">
            <NewOffering />
          </main>
        </div>
      </div>
    </div>
  )
}
