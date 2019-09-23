const styleConfig = {
    acceptTask: {
        colorTheme: {
          AgentDesktopView: {
            Panel2: {
              width: '30%'
            }
          }
        }
    },
    completeTask: {
        colorTheme: {
            AgentDesktopView: {
              Panel1: {
                width: '100%'
              },
            }
        }
    },
    branding: {
      colorTheme: {
        overrides: {
          MainHeader: {
            Container: {
                background: "#14a102",
            }
          },
          SideNav: {
            Container: {
              background: '#00BA51'
            },
            Button: {
              background: "#00BA51"
            },
          }
        }
      }
    }
}

export default styleConfig;