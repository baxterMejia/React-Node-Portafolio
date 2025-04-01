import * as React from 'react';
import type { Metadata } from 'next';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
import dayjs from 'dayjs';

import { config } from '@/config';
import { CustomersFilters } from '@/components/dashboard/customer/customers-filters';
import { CustomersTable } from '@/components/dashboard/customer/customers-table';
import type { Customer } from '@/components/dashboard/customer/customers-table';

export const metadata = { title: `Customers | Dashboard | ${config.site.name}` } satisfies Metadata;

const customers = [
  {
    id: 'USR-010',
    name: 'Johan Sebastian',
    avatar: '/assets/avatar-10.png',
    email: 'johan.sebastian@mejia.io',
    phone: '300-123-4567',
    address: { city: 'Bogotá', country: 'Colombia', state: 'Cundinamarca', street: 'Cra 13 # 86-24' },
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-009',
    name: 'Valentina Rojas',
    avatar: '/assets/avatar-9.png',
    email: 'valentina.rojas@mejia.io',
    phone: '310-555-7890',
    address: { city: 'Medellín', country: 'Colombia', state: 'Antioquia', street: 'Calle 10 # 43-62' },
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-008',
    name: 'Mateo Fernández',
    avatar: '/assets/avatar-8.png',
    email: 'mateo.fernandez@mejia.io',
    phone: '311-987-6543',
    address: { city: 'Cali', country: 'Colombia', state: 'Valle del Cauca', street: 'Av 6N # 23-40' },
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-007',
    name: 'Isabella Gómez',
    avatar: '/assets/avatar-7.png',
    email: 'isabella.gomez@mejia.io',
    phone: '312-765-4321',
    address: { city: 'Cartagena', country: 'Colombia', state: 'Bolívar', street: 'Cl 33 # 9-43' },
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-006',
    name: 'Samuel López',
    avatar: '/assets/avatar-6.png',
    email: 'samuel.lopez@mejia.io',
    phone: '313-112-3344',
    address: { city: 'Barranquilla', country: 'Colombia', state: 'Atlántico', street: 'Cl 72 # 45-89' },
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-005',
    name: 'Lucía Martínez',
    avatar: '/assets/avatar-5.png',
    email: 'lucia.martinez@mejia.io',
    phone: '314-556-7890',
    address: { city: 'Pereira', country: 'Colombia', state: 'Risaralda', street: 'Cl 19 # 8-60' },
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-004',
    name: 'Emilio Torres',
    avatar: '/assets/avatar-4.png',
    email: 'emilio.torres@mejia.io',
    phone: '315-667-9900',
    address: { city: 'Manizales', country: 'Colombia', state: 'Caldas', street: 'Cl 23 # 14-56' },
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-003',
    name: 'Sofía Ramírez',
    avatar: '/assets/avatar-3.png',
    email: 'sofia.ramirez@mejia.io',
    phone: '316-123-6789',
    address: { city: 'Bucaramanga', country: 'Colombia', state: 'Santander', street: 'Cl 36 # 21-19' },
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-002',
    name: 'Andrés Mejía',
    avatar: '/assets/avatar-2.png',
    email: 'andres.mejia@mejia.io',
    phone: '317-555-2345',
    address: { city: 'Ibagué', country: 'Colombia', state: 'Tolima', street: 'Cl 15 # 2-34' },
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-001',
    name: 'Camila Herrera',
    avatar: '/assets/avatar-1.png',
    email: 'camila.herrera@mejia.io',
    phone: '318-987-1122',
    address: { city: 'Neiva', country: 'Colombia', state: 'Huila', street: 'Cl 6 # 4-17' },
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
] satisfies Customer[];


export default function Page(): React.JSX.Element {
  const page = 0;
  const rowsPerPage = 5;

  const paginatedCustomers = applyPagination(customers, page, rowsPerPage);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Customers Example</Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Button color="inherit" startIcon={<UploadIcon fontSize="var(--icon-fontSize-md)" />}>
              Import
            </Button>
            <Button color="inherit" startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}>
              Export
            </Button>
          </Stack>
        </Stack>
        <div>
          <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
            Add
          </Button>
        </div>
      </Stack>
      <CustomersFilters />
      <CustomersTable
        count={paginatedCustomers.length}
        page={page}
        rows={paginatedCustomers}
        rowsPerPage={rowsPerPage}
      />
    </Stack>
  );
}

function applyPagination(rows: Customer[], page: number, rowsPerPage: number): Customer[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
