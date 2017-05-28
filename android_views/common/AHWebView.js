import React, { Component } from 'react';
import { WebView } from 'react-native';

class AHWebView extends Component {
  state = {
    Height: 0,
  };

  onNavigationChange=(event) => {
    if (event.title) {
      const htmlHeight = Number(event.title); // convert to number
      this.setState({
        Height: htmlHeight,
      });
    }
  }

  render() {
    const {
      html,
    } = this.props;
    const rawHtml = `
      <html>
        <head>
          <style>
            body,
            html,
            #height-calculator {
              margin: 0;
              padding: 0;
            }
            #height-calculator {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
            }
          </style>
        </head>
        <body>
          ${html}
          <script>
            window.location.hash = 1;
            var calculator = document.createElement("div");
            calculator.id = "height-calculator";
            while (document.body.firstChild) {
              calculator.appendChild(document.body.firstChild);
            }
            document.body.appendChild(calculator);
            document.title = calculator.scrollHeight;
          </script>
        </body>
      </html>
    `;
    return (
      <WebView
        scrollEnabled={false}
        source={{ html: rawHtml }}
        style={{ height: this.state.Height }}
        javaScriptEnabled={true}
        onNavigationStateChange={this.onNavigationChange}
      />
    );
  }
}

export default AHWebView;
