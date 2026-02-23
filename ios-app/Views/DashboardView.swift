import SwiftUI

struct DashboardView: View {
    @State private var jdText: String = ""
    
    var body: some View {
        NavigationView {
            VStack(spacing: 20) {
                VStack(alignment: .leading) {
                    Text("1. Original CV")
                        .font(.headline)
                    Button(action: {
                        // Upload Logic
                    }) {
                        Label("Upload PDF/DOCX", systemImage: "doc.fill")
                            .frame(maxWidth: .infinity)
                            .padding()
                            .background(Color.blue.opacity(0.1))
                            .cornerRadius(10)
                    }
                }
                
                VStack(alignment: .leading) {
                    Text("2. Job Description")
                        .font(.headline)
                    TextEditor(text: $jdText)
                        .frame(height: 150)
                        .border(Color.gray.opacity(0.2))
                        .cornerRadius(5)
                }
                
                Button(action: {
                    // Generate Logic
                }) {
                    Text("Generate variants")
                        .bold()
                        .frame(maxWidth: .infinity)
                        .padding()
                        .background(Color.blue)
                        .foregroundColor(.white)
                        .cornerRadius(10)
                }
                
                Spacer()
            }
            .padding()
            .navigationTitle("CV Tailor MVP")
        }
    }
}

struct DashboardView_Previews: PreviewProvider {
    static var previews: some View {
        DashboardView()
    }
}
