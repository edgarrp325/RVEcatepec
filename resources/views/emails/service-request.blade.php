<x-mail::message>
# Service Request

<x-mail::panel>
<strong>{{ $serviceRequest->full_name }}</strong> has requested a service.
</x-mail::panel>

**Details provided:**

- **Email:** {{ $serviceRequest->email }}
- **Procedence:** {{ $serviceRequest->procedence }}
- **Institute Name:** {{ $serviceRequest->institute_name }}
- **Request:** {{ $serviceRequest->service}}

<x-mail::panel>
A PDF CV file has been attached to this request.
</x-mail::panel>

</x-mail::message>
