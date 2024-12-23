import { Document, Page, Text, View, StyleSheet, PDFViewer, Font } from '@react-pdf/renderer';
import { ProposalFormData } from '@/types/proposal';

// Register a custom font (optional)
Font.register({
  family: 'Open Sans',
  src: 'https://fonts.gstatic.com/s/opensans/v29/memvYaGs126MiZpBA-UvWbX2vVnXBbObj2OVTS-mu0SC55I.woff2'
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Open Sans',
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    color: '#1a365d',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 15,
    color: '#2d3748',
  },
  heading: {
    fontSize: 18,
    marginBottom: 10,
    marginTop: 15,
    color: '#2d3748',
    fontWeight: 'bold',
  },
  subheading: {
    fontSize: 14,
    marginBottom: 5,
    color: '#4a5568',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 12,
    marginBottom: 8,
    lineHeight: 1.6,
    color: '#4a5568',
  },
  list: {
    marginLeft: 15,
    marginBottom: 10,
  },
  listItem: {
    fontSize: 12,
    marginBottom: 5,
    lineHeight: 1.4,
    color: '#4a5568',
  },
  header: {
    marginBottom: 30,
    borderBottom: '1 solid #e2e8f0',
    paddingBottom: 20,
  },
  companyInfo: {
    marginBottom: 10,
    fontSize: 12,
    color: '#718096',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    color: '#718096',
    fontSize: 10,
    borderTop: '1 solid #e2e8f0',
    paddingTop: 10,
  },
});

interface ProposalPDFProps {
  data: ProposalFormData;
}

export const ProposalPDF = ({ data }: ProposalPDFProps) => {
  return (
    <PDFViewer style={{ width: '100%', height: '800px' }}>
      <Document>
        <Page size="A4" style={styles.page}>
          {/* Header Section */}
          <View style={styles.header}>
            <Text style={styles.title}>{data.title}</Text>
            <Text style={styles.companyInfo}>Prepared by: {data.company_name}</Text>
            {data.website_url && (
              <Text style={styles.companyInfo}>Website: {data.website_url}</Text>
            )}
          </View>

          {/* Executive Summary */}
          <View style={styles.section}>
            <Text style={styles.heading}>Executive Summary</Text>
            <Text style={styles.text}>{data.primary_goal}</Text>
          </View>

          {/* Understanding Your Needs */}
          <View style={styles.section}>
            <Text style={styles.heading}>Understanding Your Needs</Text>
            <View style={styles.list}>
              {data.challenges?.map((challenge, index) => (
                <Text key={index} style={styles.listItem}>
                  • {challenge}
                </Text>
              ))}
            </View>
          </View>

          {/* Proposed Services */}
          <View style={styles.section}>
            <Text style={styles.heading}>Our Proposed Solution</Text>
            <View style={styles.list}>
              {data.services?.map((service, index) => (
                <Text key={index} style={styles.listItem}>
                  • {service}
                </Text>
              ))}
            </View>
          </View>

          {/* Success Metrics */}
          <View style={styles.section}>
            <Text style={styles.heading}>Measuring Success</Text>
            <View style={styles.list}>
              {data.success_metrics?.map((metric, index) => (
                <Text key={index} style={styles.listItem}>
                  • {metric.id}: {metric.value}
                </Text>
              ))}
            </View>
          </View>

          {/* Implementation Strategy */}
          <View style={styles.section}>
            <Text style={styles.heading}>Implementation Strategy</Text>
            <View style={styles.list}>
              {data.recommended_strategies?.map((strategy, index) => (
                <Text key={index} style={styles.listItem}>
                  • {strategy}
                </Text>
              ))}
            </View>
          </View>

          {/* Why Choose Us */}
          <View style={styles.section}>
            <Text style={styles.heading}>Why Choose Us</Text>
            <Text style={styles.text}>{data.reasons_to_work_with}</Text>
            
            {data.awards_recognitions && data.awards_recognitions.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.subheading}>Awards & Recognition</Text>
                <View style={styles.list}>
                  {data.awards_recognitions.map((award, index) => (
                    <Text key={index} style={styles.listItem}>
                      • {award}
                    </Text>
                  ))}
                </View>
              </View>
            )}

            {data.testimonials && data.testimonials.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.subheading}>What Our Clients Say</Text>
                <View style={styles.list}>
                  {data.testimonials.map((testimonial, index) => (
                    <Text key={index} style={styles.listItem}>
                      "{testimonial.text}" - {testimonial.client}
                    </Text>
                  ))}
                </View>
              </View>
            )}
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text>Confidential Proposal - {new Date().getFullYear()} {data.company_name}</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};