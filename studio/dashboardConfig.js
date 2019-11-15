export default {
  widgets: [
    {
      name: 'sanity-tutorials',
      options: {
        templateRepoId: 'sanity-io/sanity-template-gatsby-blog'
      }
    },
    {name: 'structure-menu'},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '5dcea2e67e05c201ae35b55f',
                  title: 'Sanity Studio',
                  name: 'sanity-kitchen-studio',
                  apiId: 'f36f7b94-6e3f-4e80-9467-c732cd548583'
                },
                {
                  buildHookId: '5dcea2e628d0ea0186896ad2',
                  title: 'Blog Website',
                  name: 'sanity-kitchen',
                  apiId: 'a203e3d6-fb06-44bc-b13e-a188a7c0c9c1'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/runeb/sanity-kitchen',
            category: 'Code'
          },
          {title: 'Frontend', value: 'https://sanity-kitchen.netlify.com', category: 'apps'}
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recent blog posts', order: '_createdAt desc', types: ['post']},
      layout: {width: 'medium'}
    }
  ]
}
