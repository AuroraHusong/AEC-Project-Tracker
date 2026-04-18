import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('comments').del();
  await knex('projects').del();

  await knex('projects').insert([
    {
      name: 'Riverside Medical Center',
      client: 'Riverside Health Group',
      status: 'active',
      budget: 900000,
      spent: 900000,
      start_date: '2025-01-15',
      end_date: '2027-01-15',
    },
    {
      name: 'Omaha Transit Hub',
      client: 'City of Omaha',
      status: 'active',
      budget: 1200000,
      spent: 820000,
      start_date: '2024-06-01',
      end_date: '2026-03-01',
    },
    {
      name: 'Westfield Library Expansion',
      client: 'Westfield City Council',
      status: 'planning',
      budget: 300000,
      spent: 45000,
      start_date: '2026-01-01',
      end_date: '2027-09-01',
    },
    {
      name: 'Denver Airport Concourse',
      client: 'Denver Intl. Airport',
      status: 'on-hold',
      budget: 450000,
      spent: 210000,
      start_date: '2024-03-01',
      end_date: '2026-12-01',
    },
  ]);
}