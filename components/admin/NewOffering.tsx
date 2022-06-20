import NewOfferingInfoForm from './newOfferingForm/OfferingInfoForm'
import NewOrganizationPrimaryIssuerForm from './newOfferingForm/OrganizationPrimaryIssuerForm'

export default function NewOffering() {
  return (
    <>
      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>

     <NewOrganizationPrimaryIssuerForm />

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>

      <NewOfferingInfoForm />
    </>
  )
}
